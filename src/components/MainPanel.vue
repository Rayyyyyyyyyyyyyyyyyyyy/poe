<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    title?: string
    showBack?: boolean | string | object
    depth?: number
  }>(),
  {
    title: '',
    showBack: false,
    depth: 1
  }
)
</script>

<template>

  <el-scrollbar class="panel-scrollbar">
    <div v-if="$slots.searchBar" class="px-4 pt-1.5">
      <slot name="searchBar" />
    </div>

    <div v-if="$slots.main" class="py-1.5 px-4">
      <slot name="main" />
    </div>
  </el-scrollbar>
  <div v-if="$slots.footer" class="flex justify-start pl-1.5 pt-0">
    <!-- 這個 slot 在列表可放 pagination -->
    <slot name="footer" />
  </div>
</template>

<style scoped>
.panel-scrollbar {
  max-height: calc(100vh - 160px);
  max-width: 100vw;
  @apply overflow-auto;
}
</style>
