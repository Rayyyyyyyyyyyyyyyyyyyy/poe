<script setup lang="ts">
import { toRefs } from 'vue'

import { useRoute } from 'vue-router'
import type { Pager } from 'src/types'
import BaseBtn from '@/components/BaseBtn.vue'
import MainPanel from '@/components/MainPanel.vue'
import SearchBar from '@/components/SearchBar.vue'
import SvgIcon from '@/components/SvgIcon.vue'

export interface PropsType {
  title: string
  pagination: Pager
  showBack?: boolean | string | object
  showSearch?: boolean
  showEdit?: boolean
  showFilter?: boolean
  showDefaultSearch?: boolean
  dataCy?: string
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
      <search-bar
        :show-filter="showFilter"
        :show-search="showSearch"
        :badge-value="badgeValue"
        @keydown:enter="search"
        @update:clear="clearable"
      >
        <template #button>
          <slot name="firstButton"></slot>
          <slot name="customButton" v-if="showEdit">
            <base-btn class="edit-btn" type="primary">
              <svg-icon name="icon-edit" />
              <p>編輯</p>
            </base-btn>
            <base-btn text="顯示" type="primary" />
          </slot>
          <slot name="lastButton"></slot>
        </template>
        <template #filterBody>
          <slot name="filterDrawBody"></slot>
        </template>
      </search-bar>
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

<style scoped lang="scss">
.edit-btn {
  @apply fill-blue-10;
  p {
    @apply text-blue-10 ml-2 font-bold;
  }

  &:hover {
    @apply fill-white;
    p {
      @apply text-white;
    }
  }
  &:disabled {
    @apply bg-white opacity-50;
    &:hover {
      @apply bg-white fill-blue-10;
      p {
        @apply text-blue-10;
      }
    }
  }
}
</style>
