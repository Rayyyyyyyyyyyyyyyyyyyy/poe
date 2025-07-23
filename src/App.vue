<script setup lang="ts">

</script>

<template>
  <div class="app__container bg-primary-20">
    <el-config-provider >
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>
<style scoped lang="scss">
.app__container {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
