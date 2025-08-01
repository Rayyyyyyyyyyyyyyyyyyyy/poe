<script setup lang="ts">
import { computed } from 'vue'
import { ElTable, ElTableColumn } from 'element-plus'
import BaseDialog from '@/components/BaseDialog.vue'
import type { DetailRecord, MaterialItem } from '@/types/page.ts'

const props = defineProps<{
  modelValue: boolean
  title?: string
  subTitle?: string
  selectedRowData: MaterialItem
  detailsData: DetailRecord[]
}>()


const emits = defineEmits<{
  (e: 'update:modelValue', data: boolean): void
}>()

const dialogVisible = computed({
  get: () => props.modelValue,
  set: value =>  emits('update:modelValue', value)

})

// 獲取狀態樣式類
const getStatusClass = (status?: string) => {
  if (!status) return 'text-gray-500'

  const statusMap = {
    'C': 'text-green-600 bg-green-100 px-2 py-1 rounded text-xs',
    'A': 'text-blue-600 bg-blue-100 px-2 py-1 rounded text-xs',
    'B': 'text-yellow-600 bg-yellow-100 px-2 py-1 rounded text-xs'
  }

  return statusMap[status as keyof typeof statusMap] || 'text-gray-600 bg-gray-100 px-2 py-1 rounded text-xs'
}

// 格式化日期
const formatDate = (dateString?: string) => {
  if (!dateString) return '-'

  // 處理 SAP 日期格式 "/Date(1747699200000)/"
  const match = dateString.match(/\/Date\((\d+)\)\//)
  if (match) {
    const timestamp = parseInt(match[1])
    const date = new Date(timestamp)
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  return dateString
}
</script>

<template>
  <base-dialog
    v-model="dialogVisible"
    :title="title"
    :sub-title="subTitle"
    custom-width="80%"
  >
    <div v-if="selectedRowData" class="p-4">
      <div class="mb-4">
        <h3 class="text-lg font-semibold mb-2 text-gray-800">基本信息</h3>
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div><span class="font-medium">material:</span> {{ selectedRowData.material }}</div>
          <div><span class="font-medium">plant:</span> {{ selectedRowData.plant }}</div>
          <div><span class="font-medium">storageLocation:</span> {{ selectedRowData.storageLocation }}
          </div>
        </div>
      </div>

      <div v-if="detailsData.length > 0">
        <h3 class="text-lg font-semibold mb-3 text-gray-800">詳細記錄</h3>
        <div class="max-h-96 overflow-y-auto">
          <el-table
            :data="detailsData"
            border
            stripe
            size="small"
            class="w-full text-sm"
            max-height="350"
          >
            <!-- 單據號欄位 -->
            <el-table-column
              prop="deliveryDocument"
              label="單據號"
              min-width="120"
              align="left"
            >
              <template #default="{ row }">
                {{ row.deliveryDocument || '-' }}
              </template>
            </el-table-column>

            <!-- 項目欄位 -->
            <el-table-column
              prop="deliveryDocumentItem"
              label="項目"
              min-width="80"
              align="left"
            >
              <template #default="{ row }">
                {{ row.deliveryDocumentItem || '-' }}
              </template>
            </el-table-column>

            <!-- 數量欄位 -->
            <el-table-column
              prop="actualDeliveryQuantity"
              label="數量"
              min-width="100"
              align="right"
            >
              <template #default="{ row }">
                {{ row.actualDeliveryQuantity || row.actualDeliveredQtyInBaseUnit || '-' }}
              </template>
            </el-table-column>

            <!-- 單位欄位 -->
            <el-table-column
              prop="baseUnit"
              label="單位"
              width="80"
              align="center"
            >
              <template #default="{ row }">
                {{ row.baseUnit || '-' }}
              </template>
            </el-table-column>

            <!-- 創建日期欄位 -->
            <el-table-column
              prop="creationDate"
              label="創建日期"
              min-width="120"
              align="center"
            >
              <template #default="{ row }">
                {{ formatDate(row.creationDate) }}
              </template>
            </el-table-column>

            <!-- 狀態欄位 -->
            <el-table-column
              prop="goodsMovementStatus"
              label="狀態"
              width="80"
              align="center"
            >
              <template #default="{ row }">
                <span :class="getStatusClass(row.goodsMovementStatus)">
                  {{ row.goodsMovementStatus || '-' }}
                </span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <div v-else class="text-center text-gray-500 py-8">
        沒有相關詳細記錄
      </div>
    </div>
  </base-dialog>
</template>

<style scoped>
</style>
