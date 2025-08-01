/**
 * 表格處理 Composable
 *
 * 提供表格操作的統一處理邏輯，包括：
 * - 行選擇和多選功能
 * - 排序處理（單列排序、多列排序）
 * - 分頁處理（頁碼、每頁數量）
 * - 搜索和篩選功能
 * - 行樣式計算
 *
 */

import type { SortChangValue, TableColumn, TableListReq } from 'src/types'
import _ from 'lodash'
import { computed, ref } from 'vue'
import { ESort } from '@/consts/appConst.ts'

/**
 * 表格處理選項配置介面
 * @template T 表格數據類型，必須包含 id 字段
 */
export interface TableHandlersOptions<T> {
  /**
   * 更新請求參數的函數
   * @param newPayload 新的請求參數
   * @param updateNow 是否立即更新，默認為 true
   */
  updatePayload: (newPayload: Partial<TableListReq>, updateNow?: boolean) => void

  /**
   * 行選擇處理函數
   * @param selectList 當前選中的行列表
   */
  onRowSelect?: (selectList: T[]) => void

  /**
   * 單元格點擊處理函數
   * @param col 點擊的欄位配置
   * @param row 點擊的行資料
   */
  onCellClick?: (col: TableColumn<T>, row: T) => void

  /**
   * 初始選中行 ID（單選模式）
   */
  initialSelectedRowId?: string

  /**
   * 初始選中行 ID 列表（多選模式）
   */
  initialSelectedRowIdList?: string[]
}

/**
 * 表格處理 composable
 * 提供表格常用功能：行選擇、排序、分頁、篩選等
 *
 * @template T 表格數據類型，必須包含 id 字段用於唯一標識
 * @param options 配置選項
 * @returns 返回表格處理相關的狀態和方法
 */
export function useTableHandlers<T extends { id: string }>(options: TableHandlersOptions<T>) {
  const {
    updatePayload,
    onRowSelect,
    onCellClick,
    initialSelectedRowId,
    initialSelectedRowIdList,
  } = options

  // ==================== 響應式狀態 ====================

  /**
   * 當前選中行的 ID（單選模式）
   * 用於高亮顯示選中的行
   */
  const selectedRowId = ref(initialSelectedRowId || '')

  /**
   * 當前選中行的 ID 列表（多選模式）
   * 用於批量操作和多選高亮
   */
  const selectedRowIdList = ref(initialSelectedRowIdList || [])

  // ==================== 狀態管理方法 ====================

  /**
   * 設置選中行 ID（單選模式）
   * @param id 行的唯一識別碼
   */
  const setSelectedRowId = (id: string) => {
    selectedRowId.value = id
  }

  /**
   * 設置選中行 ID 列表（多選模式）
   * @param idList 行 ID 列表
   */
  const setSelectedRowIdList = (idList: string[]) => {
    selectedRowIdList.value = idList
  }

  // ==================== 表格事件處理集合 ====================

  /**
   * 表格事件處理集合
   * 包含所有表格相關的事件處理方法
   */
  const handleTableEvents = {
    /**
     * 處理行選擇事件
     * 當用戶選中或取消選中表格行時觸發
     * @param selectList 選中的行列表
     */
    handleSelectRow: (selectList: T[]) => {
      if (onRowSelect) {
        onRowSelect(selectList)
      }
    },

    /**
     * 處理單元格點擊事件
     * 當用戶點擊表格單元格時觸發
     * @param col 點擊的欄位配置信息
     * @param row 點擊的行資料
     */
    handleCellClick: (col: TableColumn<T>, row: T) => {
      if (onCellClick) {
        onCellClick(col, row)
      }
    },

    /**
     * 處理排序點擊（簡單排序）
     * 根據創建時間進行升序或降序排序
     * @param type 排序類型（升序或降序）
     */
    handleSortClick: (type: 'asc' | 'desc') => {
      const sortObj = { createdAt: type }
      updatePayload({ page: 1, sort: JSON.stringify(sortObj) })
    },

    /**
     * 處理欄位排序點擊（列排序）
     * 處理表格列頭的排序點擊事件
     * @param data 排序變更資料，包含排序屬性和排序方向
     */
    handleColumnSortClick: (data: SortChangValue<T>) => {
      const sortObj: Record<string, string> = {}
      // 如果排序為 null，則預設為降序
      if (_.isNull(data.order)) {
        handleTableEvents.handleSortClick('desc')
      } else {
        // 根據排序方向設置排序物件
        sortObj[data.prop] = ESort[data.order as 'descending' | 'ascending']
        updatePayload({ page: 1, sort: JSON.stringify(sortObj) })
      }
    },

    /**
     * 處理分頁頁數變更
     * 當用戶切換到不同頁面時觸發
     * @param page 目標頁數（從 1 開始）
     */
    page: (page: number) => updatePayload({ page }),

    /**
     * 處理分頁大小變更
     * 當用戶改變每頁顯示數量時觸發
     * @param size 每頁顯示數量
     */
    size: (size: number) => updatePayload({ page: 1, limit: size }),

    /**
     * 處理關鍵字搜尋
     * 當用戶輸入搜索關鍵字時觸發
     * @param keyword 搜尋關鍵字，null 時清空搜索
     */
    keyword: (keyword: string | null) => updatePayload({ keyword: keyword ?? '' }),

    /**
     * 處理篩選資料
     * 當用戶應用篩選條件時觸發
     * @param where 篩選條件（JSON 字串格式）
     */
    filterData: (where: string) => updatePayload({ where }, false),
  }

  // ==================== 計算屬性 ====================

  /**
   * 計算行的樣式類名（單選模式）
   * 為選中的行添加特殊樣式 'is-dismissed'
   * @returns 返回計算函數，用於判斷行是否被選中
   */
  const getRowClassName = computed(() => {
    return (data: { row: T }) => (_.eq(data.row.id, selectedRowId.value) ? 'is-dismissed' : '')
  })

  /**
   * 計算行的樣式類名（多選模式）
   * 為選中的行列表中的行添加特殊樣式 'is-dismissed'
   * @returns 返回計算函數，用於判斷行是否在選中列表中
   */
  const getRowListClassName = computed(() => {
    return (data: { row: T }) =>
      selectedRowIdList.value.includes(data.row.id) ? 'is-dismissed' : ''
  })

  // ==================== 返回值 ====================

  /**
   * 返回表格處理相關的狀態和方法
   * 供組件使用的完整 API
   */
  return {
    /** 表格事件處理集合 */
    handleTableEvents,
    /** 獲取行樣式類名（單選模式） */
    getRowClassName,
    /** 當前選中的行 ID */
    selectedRowId,
    /** 設置選中的行 ID */
    setSelectedRowId,
    /** 設置選中的行 ID 列表 */
    setSelectedRowIdList,
    /** 當前選中的行 ID 列表 */
    selectedRowIdList,
    /** 獲取行樣式類名（多選模式） */
    getRowListClassName,
  }
}
