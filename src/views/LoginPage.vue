<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import _ from 'lodash'
import { ElMessage } from 'element-plus'
import BaseInput from "@/components/BaseInput.vue";
import BaseBtn from "@/components/BaseBtn.vue";

const state = reactive({
  formData: {
    client: '100',
    email: '',
    password: ''
  },
  submitLoading: false,
  sapLoginLoading: false
})

const clientOptions = [
  { label: '100', value: '100' },
  { label: '200', value: '200' }
]
const router = useRouter()


const handleLogin = async () => {
  if (_.isEmpty(state.formData.password) || _.isEmpty(state.formData.email)) {
    ElMessage.warning('請輸入帳號和密碼')
    return
  }

  state.submitLoading = true

}

const handleForgotPassword = () => {

}

const handleSAPLogin = async () => {

}

// 表單驗證
const validateForm = () => {
  if (!state.formData.email) {
    ElMessage.warning('請輸入登入帳號')
    return false
  }
  if (!state.formData.password) {
    ElMessage.warning('請輸入登入密碼')
    return false
  }
  // 簡單的 email 格式驗證
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (!emailRegex.test(state.formData.email)) {
    ElMessage.warning('請輸入正確的 email 格式')
    return false
  }
  return true
}

const handleSubmit = async () => {
  if (validateForm()) {
    await handleLogin()
  }
}
</script>

<template>
  <div class="login-container">
    <el-card class="login-card" shadow="never">
      <!-- 標題區域 -->
      <div class="login-header">
        <h1 class="login-title">登入</h1>
        <div class="client-selector">
          <span class="client-label">Client</span>
          <el-select v-model="state.formData.client" class="client-select" data-cy="client-select">
            <el-option
              v-for="option in clientOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </div>
      </div>

      <!-- 登入表單 -->
      <el-form :model="state" class="login-form" @submit.prevent="handleSubmit">
        <el-form-item>
          <base-input
            type="email"
            v-model="state.formData.email"
            placeholder="請輸入登入帳號"
            class="login-input"
            data-cy="username-input"
            @keydown.enter="handleSubmit"
          />
        </el-form-item>

        <el-form-item>
          <base-input
            v-model="state.formData.password"
            type="password"
            placeholder="請輸入登入密碼"
            class="login-input"
            show-password
            data-cy="password-input"
            @keydown.enter="handleSubmit"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            class="login-button"
            :loading="state.submitLoading"
            @click="handleSubmit"
            data-cy="login-btn"
          >
            登入
          </el-button>
        </el-form-item>
      </el-form>

      <!-- 忘記密碼 -->
      <div class="forgot-password">
        <base-btn
          text="忘記密碼"
          class="forgot-link"
          :textBtn="true"
          @click="handleForgotPassword"
          data-cy="forgot-password-btn"
        />
      </div>

      <!-- 分隔線 -->
      <div class="divider">
        <div class="divider-line"></div>
        <span class="divider-text">或</span>
        <div class="divider-line"></div>
      </div>

      <!-- SAP PE Account 登入 -->
      <el-button
        class="sap-button"
        @click="handleSAPLogin"
        v-loading="state.sapLoginLoading"
        data-cy="sap-login-btn"
      >
        <img src="../assets/images/sap-logo.png" alt="SAP" class="sap-logo" />
        <span class="sap-text">SAP PE Account</span>
      </el-button>

    </el-card>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  @apply flex items-center justify-start bg-gray-100;
  @apply w-screen mx-auto md:pl-10;
  @apply bg-repeat bg-left;
  min-height: calc(100vh - 60px);
  background-image: url('@/assets/images/login-bg.png');
  background-size: cover;

  @media (max-width: 768px) {
    @apply pl-4 pr-4 justify-center;
    background-size: cover;
    background-position: center;
  }

  @media (min-width: 769px) {
    background-size: 120%;
    background-position: left center;
  }
}

.login-card {
  @apply w-[494px] p-8 border rounded-[33px] border-bg-loginBorder;

  // 響應式寬度調整
  @media (max-width: 768px) {
    @apply w-full max-w-[400px] p-6;
  }

  @media (max-width: 480px) {
    @apply max-w-[350px] p-4;
  }
}

.login-header {
  @apply flex items-start justify-between mb-8;

  .login-title {
    @apply text-4xl font-bold text-gray-800 m-0;
  }

  .client-selector {
    @apply flex items-center gap-2;

    .client-label {
      @apply text-text-welcome font-medium;
    }

    .client-select {
      @apply w-20;
    }
  }
}

.login-form {
  @apply space-y-4;

  .login-input {
    @apply w-full;

    :deep(.el-input__wrapper) {
      @apply h-12 rounded-lg border-gray-300;
    }

    :deep(.el-input__inner) {
      @apply text-base;
    }
  }

  .login-button {
    @apply w-full h-12 text-lg font-medium rounded-lg;
    @apply bg-blue-600 hover:bg-blue-700;
  }
}

.forgot-password {
  @apply text-left mb-2;

  .forgot-link {
    @apply text-blue-600 hover:text-blue-700 p-0 underline text-sm;
    span {
      @apply font-bold;
    }
  }
}

.divider {
  @apply flex items-center justify-center gap-4 my-4;

  .divider-line {
    @apply flex-1 h-px bg-gray-300;
  }

  .divider-text {
    @apply text-gray-500 text-sm;
  }
}

.sap-button {
  @apply w-full h-12 border-2 border-blue-600 rounded-lg;
  @apply bg-white hover:bg-blue-50 mb-6 relative;

  .sap-logo {
    @apply w-14 h-8 absolute;
    @apply left-6;
  }

  .sap-text {
    @apply text-blue-600 font-semibold text-lg;
  }
}

.version {
  @apply text-center text-gray-500 text-sm;
}

// Element Plus 樣式覆蓋
:deep(.el-card__body) {
  @apply p-0;
}

:deep(.el-form-item) {
  @apply mb-4;
}

:deep(.el-form-item__content) {
  @apply m-0;
}

:deep(.el-select .el-input .el-input__wrapper) {
  @apply border-gray-300;
}
</style>
