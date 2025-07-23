<script setup lang="ts" generic="T extends Record<string, unknown>">
import BaseTable from '@/components/BaseTable.vue'
import type { SortChangValue, TableColumn } from 'src/types'
import type { TableColumnCtx } from 'element-plus'
import type { VNode } from 'vue'

defineProps<{
  data: T[]
  columns: TableColumn<T>[]
  tableTitle?: string
  propIsEditable?: boolean
  showSelection?: boolean
  loading?: boolean
  showSummary?: boolean
  showOverFlowTooltip?: boolean
  summaryMethod?: (param: { columns: TableColumnCtx<T>[]; data: T[] }) => (string | VNode)[]
  sortTableRowClassName?: (data: { row: T; rowIndex: number }) => string
}>()

const emit = defineEmits<{
  (e: 'open:transfer'): void
  (e: 'click:download'): void
  (e: 'update:selectRow', value: T[]): void
  (e: 'click:cell', column: TableColumn<T>, row: T): void
  (e: 'click:columnSort', data: SortChangValue<T>): void
}>()

const openTransferDialog = () => {
  emit('open:transfer')
}
const onDownloadClick = () => {
  emit('click:download')
}

const handleSelectionChange = (selectList: T[]) => {
  emit('update:selectRow', selectList)
}
const handleCellClick = (column: TableColumn<T>, row: T) => {
  emit('click:cell', column, row)
}

const handleColumnSortChange = (data: SortChangValue<T>) => {
  emit('click:columnSort', data)
}
</script>

<template>
  <div class="data-table-container" data-cy="sort-table">
    <div class="table-function-bar">
      <div class="right">
        <div
          class="w-4 cursor-pointer"
          @click="openTransferDialog"
          data-cy="table-column-setting-btn"
        >
          <img class="w-full" src="@/assets/images/table-set.png" alt="" />
        </div>
        <div class="w-5 ml-2 cursor-pointer" @click="onDownloadClick">
          <img class="w-full" src="@/assets/images/table-download.png" alt="" />
        </div>
      </div>
    </div>

    <base-table
      v-loading="loading"
      element-loading-text="數據加載中..."
      :data="data"
      :columns="columns"
      :show-summary="showSummary"
      :show-over-flow-tooltip="showOverFlowTooltip"
      :summary-method="summaryMethod"
      :show-selection="propIsEditable || showSelection"
      :base-table-row-class-name="sortTableRowClassName"
      @selection-change="handleSelectionChange"
      @cell-click="handleCellClick"
      @column-sort-change="handleColumnSortChange"
    />
  </div>
</template>

<style scoped lang="scss">
.data-table-container {
  @apply w-full mb-4;
}

.table-function-bar {
  @apply flex items-center h-12 bg-primary-15 px-1.5 rounded-t;
  @apply justify-end;

  .right {
    @apply flex items-center mr-4;
  }

  .sort-btn {
    @apply fill-blue-10;
    &:hover {
      @apply fill-white text-white;
    }
  }
}
</style>
