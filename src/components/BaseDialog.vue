<script setup lang="ts">
import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'
import BaseBtn from '@/components/BaseBtn.vue'

const props = defineProps<{
  modelValue: boolean
  title?: string
  subTitle?: string
  beforeClose?: () => void
  customWidth?: string
  isWaring?: boolean
  isPrimary?: boolean
  bodyLoading?: boolean
  submitLoading?: boolean
}>()

const { width } = useWindowSize()

const emits = defineEmits<{
  (e: 'update:modelValue', data: boolean): void
}>()

const v = computed({
  get: () => props.modelValue,
  set: (val: boolean) => emits('update:modelValue', val)
})

const getWidth = computed(() => {
  if (width.value < 1000) {
    return '80%'
  } else if (props.customWidth) {
    return props.customWidth
  }
  return '50%'
})

const handleCancel = () => {
  v.value = false
}
</script>

<template>
  <el-dialog
    v-model="v"
    :title="props.title"
    :width="getWidth"
    :before-close="props.beforeClose"
    :close-on-click-modal="false"
    center
    class="rounded-md base-dialog"
    :class="{ 'waring-dialog': props.isWaring, 'upload-result-dialog': props.isPrimary }"
    align-center
    destroy-on-close
  >
    <template #header="{ titleId, titleClass }">
      <slot name="customHeader">
        <p :id="titleId" class="dialog-title" :class="titleClass">
          {{ props.title }}
        </p>
      </slot>
    </template>

    <div class="p-2" v-loading="bodyLoading">
      <div
        class="sub-title"
        :class="{
          'border-b mb-4': typeof subTitle == 'string'
        }"
      >
        {{ subTitle }}
      </div>

      <slot></slot>
    </div>
    <template #footer>
      <footer>
        <slot name="customFooter">
          <base-btn type="primary" @click="handleCancel">
            關閉
          </base-btn>
        </slot>
      </footer>
    </template>
  </el-dialog>
</template>

<style scoped>
.dialog-title {
  @apply font-bold text-base;
}
</style>
