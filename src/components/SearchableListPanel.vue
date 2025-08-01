<script setup lang="ts">

import MainPanel from '@/components/MainPanel.vue'



</script>

<template>
  <main-panel title="SAP 材料庫存查詢" >
    <template #searchBar>
      <slot name="toolBar" />

    </template>

    <template #main>
      <slot name="main" />
    </template>


  </main-panel>
</template>

<style scoped lang="scss"></style>
