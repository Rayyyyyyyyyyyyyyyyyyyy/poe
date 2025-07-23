<script lang="ts" setup>
import BaseBtn from './BaseBtn.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { computed, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

defineProps<{
  badgeValue?: number
}>()

const showDrawer = ref(false)

function onClickBtn() {
  showDrawer.value = !showDrawer.value
}

const resetValue = () => {
}
const computedDrawerSize = computed(() => {
  if (width.value > 1200) {
    return '30%'
  } else if (width.value < 500) {
    return '100%'
  } else {
    return '50%'
  }
})

const submitFilter = () => {
  showDrawer.value = false
}
</script>

<template>
  <base-btn type="primary" class="filter-btn" data-cy="filter-btn" @click="onClickBtn">
    <el-badge :value="badgeValue" class="item" type="primary" v-if="badgeValue && badgeValue > 0">
      <svg-icon name="icon-filter-blue" :width="16" color="#e0e0e0" />
    </el-badge>
    <svg-icon v-else name="icon-filter" :width="16" />
  </base-btn>
  <el-drawer v-model="showDrawer" append-to-body :size="computedDrawerSize">
    <template #header>
      <div class="flex justify-center text-base text-black font-semibold">
        <span>查詢條件</span>
      </div>
    </template>

    <div class="flex justify-between items-center pb-5 font-semibold">
      <div class="text-base">篩選條件</div>
      <div
        class="text-base text-primary cursor-pointer"
        @click="resetValue"
        data-cy="filter-reset-btn"
      >
        重置
      </div>
    </div>

    <slot></slot>

    <template #footer>
      <base-btn type="primary" class="filter-btn" @click="submitFilter" data-cy="filter-submit-btn">
        <svg-icon name="icon-search" :width="16"></svg-icon>
        <p class="ml-2 text-base">{{ $t('共用.查詢') }}</p>
      </base-btn>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss">
.filter-btn {
  @apply fill-blue-10 stroke-blue-10;
  p {
    @apply text-blue-10 ml-2 font-bold;
  }

  &:hover {
    @apply fill-white stroke-white;
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
