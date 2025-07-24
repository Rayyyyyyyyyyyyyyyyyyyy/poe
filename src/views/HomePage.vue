<script setup lang="ts">
import SearchableListPanel from '@/components/SearchableListPanel.vue'
import SortTable from '@/components/SortTable.vue'
import type { TableColumn } from '@/types'

// 定義組件屬性類型
interface Props {
  /** 表格標題 */
  title?: string
  /** 載入狀態 */
  loading?: boolean
  /** 表格數據 */
  tableData?: Record<string, unknown>[]
  /** 表格欄位配置 */
  columns?: TableColumn[]
  /** 是否顯示預設搜尋 */
  showDefaultSearch?: boolean
  /** 是否顯示選擇框 */
  showSelection?: boolean
  /** 分頁資訊 */
  pagination?: {
    page: number
    limit: number
    totalCount: number
  }
}

// 定義事件類型
interface Emits {
  /** 點擊儲存格事件 */
  (e: 'cell-click', column: TableColumn, row: unknown): void
  /** 選擇行變更事件 */
  (e: 'select-row', selectList: unknown[]): void
  /** 分頁變更事件 */
  (e: 'pagination-change', page: number, limit: number): void
  /** 搜尋事件 */
  (e: 'search', searchData: string | null): void
}

// 接收屬性並設定預設值
const props = withDefaults(defineProps<Props>(), {
  title: '',
  loading: false,
  tableData: () => [],
  columns: () => [],
  showDefaultSearch: true,
  showSelection: true,
  pagination: () => ({
    page: 1,
    limit: 10,
    totalCount: 0
  })
})

// 定義事件發射器
const emit = defineEmits<Emits>()

// 處理儲存格點擊事件
const handleCellClick = (column: TableColumn, row: unknown) => {
  emit('cell-click', column, row)
}

// 處理選擇行變更事件
const handleSelectRow = (selectList: unknown[]) => {
  emit('select-row', selectList)
}

// 處理分頁變更事件
const handlePaginationChange = (page: number, limit: number) => {
  emit('pagination-change', page, limit)
}

// 處理搜尋事件
const handleSearch = (searchData: string | null) => {
  emit('search', searchData)
}
</script>

<template>
  <searchable-list-panel
    :title="props.title"
    :show-default-search="props.showDefaultSearch"
    :pagination="props.pagination"
    @pagination-change="handlePaginationChange"
    @search="handleSearch"
  >
    <template #main>
      <sort-table
        :loading="props.loading"
        :data="props.tableData"
        :columns="props.columns"
        :show-selection="props.showSelection"
        @click:cell="handleCellClick"
        @update:selectRow="handleSelectRow"
      />
    </template>

    <!-- 預留額外的 slot 供外部使用 -->
    <template #header>
      <slot name="header" />
    </template>

    <template #filter>
      <slot name="filter" />
    </template>

    <template #actions>
      <slot name="actions" />
    </template>

    <template #footer>
      <slot name="footer" />
    </template>
  </searchable-list-panel>
</template>

<style scoped lang="scss">
// 可以添加組件特定的樣式
</style>
