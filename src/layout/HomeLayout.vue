<script setup lang="ts">
import MenuBar from '@/components/layout/MenuBar.vue'
import { layoutStore } from '@/stores/layoutStore.ts'
import HeaderBar from '@/components/layout/HeaderBar.vue'
import { userStore } from '@/stores/userStore.ts'
import { useRoute, useRouter } from 'vue-router'
import { watch } from 'vue'
import { ROUTES } from '@/router/constants.ts'

const route = useRoute()
const router = useRouter()

// 監聽路由變化，檢查認證狀態
watch(
  () => route.path,
  currentPath => {
    // 如果在根路徑但沒有登入，導向登入頁面
    if (currentPath === '/' && !userStore.isAuth) {
      router.push(ROUTES.LOGIN.PAGE)
    }
  },
  { immediate: true }
)
</script>

<template>
  <el-container class="w-full">
    <el-header class="header"><header-bar /> </el-header>
    <el-container>
      <div
        class="menu-wrapper"
        :class="{
          'show-menu': layoutStore.asideMenuVisible,
          'hide-menu': !layoutStore.asideMenuVisible
        }"
      >
        <menu-bar />
      </div>

      <el-container>
        <el-main class="bg-white">
          <router-view v-slot="{ Component }">
            <keep-alive :include="/.*(Page|Detail)$/">
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.el-main {
  @apply p-0;
}

.menu-wrapper {
  transition: all 0.3s linear;
  @apply flex-shrink-0 overflow-hidden w-0;
}

.show-menu {
  max-width: 540px;
  @apply w-fit;

  @media (max-width: 500px) {
    max-width: 100vw;
    @apply w-screen;
  }
}

.hide-menu {
  @apply m-0 p-0;
  max-width: 0;
}
.header {
  @apply bg-primary-dark sticky top-0;
  @apply p-1 !important;
}
</style>
