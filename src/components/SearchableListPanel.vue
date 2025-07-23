<script setup lang="ts">
import { toRefs, computed } from 'vue'

import { useRoute } from 'vue-router'
import type { Pager } from 'src/types'
import MainPanel from '@/components/MainPanel.vue'
import FilterBtn from '@/components/FilterBtn.vue'

export interface PropsType {
  title: string
  pagination: Pager
  showBack?: boolean | string | object
  badgeValue?: number
}

const props = defineProps<PropsType>()

const { pagination } = toRefs(props)

const emits = defineEmits<{
  (e: 'search', data: string | null): void
  (e: 'updatePage', page: number): boolean
  (e: 'updatePageSize', limit: number): boolean
}>()

const search = (keyword: string) => {
  emits('search', keyword)
}
const clearable = () => {
  emits('search', null)
}

const updatePage = (page: number) => {
  emits('updatePage', page)
}
const changePageSize = (limit: number) => {
  emits('updatePageSize', limit)
}
const route = useRoute()
</script>

<template>
  <main-panel :title="props.title" :show-back="showBack">
    <template #searchBar>
      <filter-btn :badge-value="badgeValue">
        <slot name="filterDrawBody" />
      </filter-btn>
    </template>

    <template #main>
      <slot name="main" />
    </template>

    <template #footer>
      <el-pagination
        v-if="pagination.totalCount > 0"
        layout="jumper, prev, pager, next, total, sizes"
        :page-sizes="[10, 20, 30, 40, 50]"
        :current-page="pagination.page"
        :page-size="pagination.limit"
        :total="pagination.totalCount"
        @current-change="updatePage"
        @size-change="changePageSize"
      />
    </template>
  </main-panel>
</template>

<style scoped lang="scss"></style>
