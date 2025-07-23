import type { VNode } from 'vue'
import type { TableColumnCtx } from 'element-plus'

export type SortChangValue<T> = { column: TableColumnCtx<T>[]; order: string; prop: string }

/** 表格列表請求參數 */
export type TableListReq = {
  /** 頁數 */
  page?: number
  /** 每頁筆數 */
  limit?: number
  /** 排序條件 */
  sort?: string
  /** 查詢條件 */
  where?: string
  /** 關鍵字 */
  keyword?: string
}

/** 分頁資訊 */
export interface Pager {
  /** 總筆數 */
  totalCount: number
  /** 每頁筆數 */
  limit: number
  /** 目前頁數 */
  page: number
}

/** 表格欄位設定 */
export interface TableColumn<T = Record<string, unknown>> {
  /** 屬性名稱 */
  prop?: string
  /** 欄位標題 */
  label: string
  /** 欄位寬度 */
  width?: number | string
  /** 欄位類型 */
  type?: 'selection' | 'index' | 'expand'
  /** 固定位置 */
  fixed?: boolean | 'left' | 'right'
  /** 對齊方式 */
  align?: 'center' | 'left' | 'right'
  /** 是否可排序 */
  sortable?: boolean | 'custom'
  /** 格式化函數 */
  formatter?: (row: T) => string
  /** 自定義模板 */
  template?: (row: T) => VNode
  /** 最小寬度 */
  minWidth?: number | string
  /** 標題對齊方式 */
  headerAlign?: 'center' | 'left' | 'right'
  /** 是否勾選啟用 */
  checkActive?: boolean
}
