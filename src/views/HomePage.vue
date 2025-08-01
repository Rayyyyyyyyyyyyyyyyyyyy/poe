<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { ElMessage, ElButton, ElIcon } from 'element-plus'
import { Refresh } from '@element-plus/icons-vue'
import SearchableListPanel from '@/components/SearchableListPanel.vue'
import SortTable from '@/components/SortTable.vue'
import type { TableColumn } from '@/types'
import { API_CONFIG, buildApiUrl } from '@/config/api'
import { h } from 'vue'
import DetailDialog from '@/components/DetailDialog.vue'
import type { ApiMaterialItem, DetailRecord, MaterialItem, MaterialsRequest } from '@/types/page.ts'
import BaseDialog from '@/components/BaseDialog.vue'

// 響應式狀態
const state = reactive({
  loading: false,
  tableData: [] as MaterialItem[],
  error: null as string | null,
  dialogVisible: false,
  selectedRowData: {} as MaterialItem,
  selectedColumn: null as TableColumn<MaterialItem> | null
})

// 表格欄位配置
const columns: TableColumn<MaterialItem>[] = [
  {
    prop: 'plant',
    label: 'Plant',
    minWidth: 100,
    align: 'center',
    formatter: (row: MaterialItem) => {
      // 小計和總計行不顯示工廠編號，數據行顯示時避免重複
      if (row.rowType === 'subtotal') return 'Subtotal'
      if (row.rowType === 'total') return 'Total'
      return row.plant || ''
    }
  },
  {
    prop: 'material',
    label: 'Material',
    minWidth: 120,
    align: 'center',
    formatter: (row: MaterialItem) => {
      // 小計和總計行不顯示材料編號
      if (row.rowType === 'subtotal' || row.rowType === 'total') return ''
      return row.material || ''
    }
  },
  {
    prop: 'storageLocation',
    label: 'Storage Location',
    minWidth: 140,
    align: 'center',
    formatter: (row: MaterialItem) => {
      // 小計和總計行不顯示儲存位置
      if (row.rowType === 'subtotal' || row.rowType === 'total') return ''
      return row.storageLocation || ''
    }
  },
  {
    prop: 'soCount',
    label: 'SO Count',
    width: 120,
    align: 'center',
    template: row =>
      h(
        'span',
        { class: 'href-text' },
        row.soCount?.toString() || '0'
      )

  },
  {
    prop: 'dnCount',
    label: 'DN Count',
    width: 120,
    align: 'center',
    template: row =>
      h(
        'span',
        { class: 'href-text' },
        row.dnCount?.toString() || '0'
      )
  },
  {
    prop: 'stockQty',
    label: 'Stock Qty',
    width: 120,
    align: 'center',
    template: row =>
      h(
        'span',
        { class: 'href-text' },
        row.stockQty?.toString() || '0'
      )

  }
]

// 處理分組數據的函數
const processGroupedData = (rawData: MaterialItem[]): MaterialItem[] => {
  const result: MaterialItem[] = []

  // 按工廠分組
  const grouped = rawData.reduce((acc, item) => {
    if (!acc[item.plant]) {
      acc[item.plant] = []
    }
    acc[item.plant].push(item)
    return acc
  }, {} as Record<string, MaterialItem[]>)

  let totalSoCount = 0
  let totalDnCount = 0
  let totalStockQty = 0

  // 處理每個工廠的數據
  Object.keys(grouped).forEach((plant) => {
    const plantData = grouped[plant]

    // 添加工廠數據行，第一行顯示工廠編號，其他行不顯示
    plantData.forEach((item, itemIndex) => {
      result.push({
        ...item,
        plant: itemIndex === 0 ? plant : '', // 只在第一行顯示工廠編號
        rowType: 'data'
      })
    })

    // 計算該工廠的小計
    const subtotalSoCount = plantData.reduce((sum, item) => sum + item.soCount, 0)
    const subtotalDnCount = plantData.reduce((sum, item) => sum + item.dnCount, 0)
    const subtotalStockQty = plantData.reduce((sum, item) => sum + item.stockQty, 0)

    // 添加小計行
    result.push({
      plant: 'Subtotal',
      material: '',
      storageLocation: '',
      soCount: subtotalSoCount,
      dnCount: subtotalDnCount,
      stockQty: subtotalStockQty,
      soDetails: [],
      dnDetails: [],
      stockDetails: [],
      rowType: 'subtotal'
    })

    // 累加到總計
    totalSoCount += subtotalSoCount
    totalDnCount += subtotalDnCount
    totalStockQty += subtotalStockQty
  })

  // 添加總計行
  result.push({
    plant: 'Total',
    material: '',
    storageLocation: '',
    soCount: totalSoCount,
    dnCount: totalDnCount,
    stockQty: totalStockQty,
    soDetails: [],
    dnDetails: [],
    stockDetails: [],
    rowType: 'total'
  })

  return result
}

// API 調用函數
const fetchMaterials = async (requestData: MaterialsRequest): Promise<MaterialItem[]> => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT)

  try {
    const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.MATERIALS), {
      method: 'POST',
      headers: API_CONFIG.DEFAULT_HEADERS,
      body: JSON.stringify(requestData),
      signal: controller.signal
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      throw new Error(`API 請求失敗: ${response.status} ${response.statusText}`)
    }
    const data = await response.json()

    // 處理 API 返回的數據，確保數據格式正確
    const rawItems = Array.isArray(data) ? data : (data.materials || data.data || data.items || [])


    const processedData: MaterialItem[] = rawItems.map((item: ApiMaterialItem, index: number) => {
      const processed: MaterialItem = {
        plant: item.plant,
        material: item.material,
        storageLocation: item.storageLocation,
        soCount: item.soCount,
        dnCount: item.dnCount,
        stockQty: item.stockQty,
        soDetails: item.soDetails || [],
        dnDetails: item.dnDetails || [],
        stockDetails: item.stockDetails || [],
        rowType: 'data' as const
      }


      return processed
    })


    return processGroupedData(processedData)
  } catch (error) {
    clearTimeout(timeoutId)

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('請求超時，請稍後再試')
      }
      throw error
    }
    throw new Error('網路請求失敗')
  }
}

// 載入材料數據
const loadMaterials = async () => {
  try {
    state.loading = true
    state.error = null

    const requestPayload: MaterialsRequest = {
      materials: ['TG11', 'TG0001'],
      plants: ['6310'],
      storageLocation: ['631A']
    }

    const materials = await fetchMaterials(requestPayload)
    state.tableData = materials

    // 計算實際數據行數（排除小計和總計行）
    const dataRowCount = materials.filter(item => item.rowType === 'data').length

    ElMessage.success(`成功載入 ${dataRowCount} 筆材料數據，共 ${materials.length} 行（含小計與總計）`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '載入材料數據失敗'
    state.error = errorMessage
    ElMessage.error(errorMessage)
    console.error('載入材料數據失敗:', error)
  } finally {
    state.loading = false
  }
}

// 重新載入數據
const reloadData = () => {
  loadMaterials()
}

// 處理儲存格點擊事件
const handleCellClick = (column: TableColumn<MaterialItem>, row: MaterialItem) => {

  // 只有點擊 count 欄位且是數據行時才打開對話框
  if ((column.prop === 'soCount' || column.prop === 'dnCount' || column.prop === 'stockQty')
    && row.rowType === 'data') {
    state.selectedRowData = row
    state.selectedColumn = column
    state.dialogVisible = true
  }
}


// 獲取行的 CSS 類名
const getRowClassName = ({ row }: { row: MaterialItem }) => {
  if (row.rowType === 'subtotal') {
    return 'subtotal-row'
  }
  if (row.rowType === 'total') {
    return 'total-row'
  }
  return 'data-row'
}


// 獲取對話框標題
const getDialogTitle = () => {
  if (!state.selectedColumn) return '詳細信息'

  const titleMap = {
    soCount: 'SO 詳細記錄',
    dnCount: 'DN 詳細記錄',
    stockQty: '庫存詳細記錄'
  }

  return titleMap[state.selectedColumn.prop as keyof typeof titleMap] || '詳細信息'
}

// 獲取對話框副標題
const getDialogSubTitle = () => {
  if (!state.selectedRowData) return ''

  return `${state.selectedRowData.material} - ${state.selectedRowData.plant} - ${state.selectedRowData.storageLocation}`
}

// 獲取詳細數據
const getDetailsData = (): DetailRecord[] => {
  if (!state.selectedRowData || !state.selectedColumn) return []

  const dataMap = {
    soCount: state.selectedRowData.soDetails || [],
    dnCount: state.selectedRowData.dnDetails || [],
    stockQty: state.selectedRowData.stockDetails || []
  }

  return dataMap[state.selectedColumn.prop as keyof typeof dataMap] || []
}


// 組件掛載時載入數據
onMounted(() => {
  loadMaterials()
})
</script>

<template>
  <div class="sap-materials-page">
    <searchable-list-panel
    >
      <!-- 工具欄插槽 -->
      <template #toolBar>
        <div class="flex items-center gap-3">
          <el-button
            type="primary"
            @click="reloadData"
            :loading="state.loading"
            class="px-4 py-2 font-medium"
          >
            <el-icon class="mr-1">
              <Refresh />
            </el-icon>
            重新載入
          </el-button>
        </div>
      </template>

      <!-- 主要內容插槽 -->
      <template #main>
        <!-- 錯誤提示 -->
        <div v-if="state.error"
             class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg shadow-sm">
          <p class="text-red-600 mb-3 text-sm font-medium">{{ state.error }}</p>
          <el-button
            type="primary"
            size="small"
            @click="reloadData"
            class="px-4 py-2 text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
          >
            重試
          </el-button>
        </div>

        <!-- 表格 -->
        <sort-table
          :loading="state.loading"
          :data="state.tableData"
          :columns="columns"
          :show-selection="false"
          :row-class-name="getRowClassName"
          @click:cell="handleCellClick"
        />
      </template>
    </searchable-list-panel>
  </div>

  <detail-dialog
    v-model="state.dialogVisible"
    :title="getDialogTitle()"
    :sub-title="getDialogSubTitle()"
    :selected-row-data="state.selectedRowData"
    :details-data="getDetailsData()"
    @update:model-value="state.dialogVisible = $event"


  />
</template>

<style lang="scss">
// 全局容器樣式
.sap-materials-page {
  @apply w-full h-full bg-white;
}

// 可點擊文字樣式
.href-text {
  @apply underline;
  @apply cursor-pointer text-blue-10 font-bold hover:text-blue-20 transition-colors duration-200;
}

// 表格行樣式 - 完全使用 Tailwind 自定義顏色
:deep(.el-table) {
  .data-row {
    @apply bg-white hover:bg-gray-50 transition-colors duration-150;
  }

  .subtotal-row {
    @apply bg-primary-15 font-semibold text-text;

    td {
      @apply bg-primary-15 border-t border-primary-20;
    }
  }

  .total-row {
    @apply bg-orange/10 font-bold text-orange;

    td {
      @apply bg-orange/10 border-t-2 border-b-2 border-orange;
    }
  }

  // 確保小計和總計行懸停時保持背景色
  .subtotal-row:hover td {
    @apply bg-primary-15;
  }

  .total-row:hover td {
    @apply bg-orange/10;
  }
}
</style>
