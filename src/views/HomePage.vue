<script setup lang="ts">
import { reactive } from 'vue'
import SearchableListPanel from '@/components/SearchableListPanel.vue'
import SortTable from '@/components/SortTable.vue'

const state = reactive({
  loading: false,
  tableData: [],
  dialogVisible: false,
})

const columns = []

const handleCellClick = () => {}
const handleSelectRow = (selectList) => {}
const handleSubmit = () => {}
</script>

<template>
  <searchable-list-panel
    title=""
    show-default-search
    :pagination="{
      page: 0,
      limit: 0,
      totalCount: 0,
    }"
  >
    <template #main>
      <sort-table
        :loading="state.loading"
        :data="state.tableData"
        :columns="columns"
        show-selection
        @click:cell="handleCellClick"
        @update:selectRow="handleSelectRow"
      />
    </template>
  </searchable-list-panel>
</template>

<style scoped lang="scss"></style>
