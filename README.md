# Template

基於 Vue 3 + TypeScript + Element Plus 的前端應用程式模板

## ✨ 特色功能

- 🚀 **現代化技術棧**: Vue 3 + TypeScript + Vite
- 🎨 **豐富 UI 組件**: Element Plus + Tailwind CSS + SCSS
- 📱 **響應式設計**: 支援多種螢幕尺寸
- 🧪 **完整測試方案**: Vitest 單元測試 + Cypress E2E 測試
- 📦 **自動化導入**: 自動導入 Vue API 和組件
- 🎯 **TypeScript 支援**: 完整的類型定義和類型檢查
- 🔄 **狀態管理**: Pinia 狀態管理
- 🛠️ **開發工具**: ESLint + Prettier 代碼規範

## 🛠️ 技術棧

- **前端框架**: Vue 3.5
- **開發語言**: TypeScript 5.8
- **構建工具**: Vite 6.2
- **UI 組件庫**: Element Plus 2.9
- **樣式方案**: Tailwind CSS + SCSS
- **狀態管理**: Pinia 3.0
- **路由管理**: Vue Router 4.5
- **測試框架**: Vitest + Cypress
- **代碼規範**: ESLint + Prettier

## 📁 項目結構

```
template/
├── src/
│   ├── assets/           # 靜態資源
│   │   ├── images/       # 圖片資源
│   │   └── styles/       # 樣式文件
│   ├── components/       # 通用組件
│   │   ├── BaseBtn.vue           # 基礎按鈕組件
│   │   ├── BaseInput.vue         # 基礎輸入框組件
│   │   ├── BaseTable.vue         # 基礎表格組件
│   │   ├── SortTable.vue         # 可排序表格組件
│   │   └── ...
│   ├── layout/           # 佈局組件
│   ├── router/           # 路由配置
│   ├── stores/           # 狀態管理
│   ├── types/            # TypeScript 類型定義
│   ├── views/            # 頁面視圖
│   └── plugins/          # 插件配置
├── cypress/              # E2E 測試
├── public/               # 公共資源
└── ...配置文件
```

## 🚀 快速開始

### 環境要求

- Node.js >= 18
- npm >= 8 或 yarn >= 1.22

### 安裝依賴

```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install
```

### 開發環境

```bash
# 啟動開發服務器
npm run dev

# 訪問 http://localhost:5173
```

### 構建部署

```bash
# 類型檢查
npm run type-check

# 構建生產版本
npm run build

# 預覽生產版本
npm run preview
```

## 🧪 測試

### 單元測試

```bash
# 運行單元測試
npm run test:unit

# 監聽模式運行測試
npm run test:unit -- --watch
```

### E2E 測試

> ⚠️ **注意**: 運行 E2E 測試前需要先登入獲取 token [[memory:2694165]]

```bash
# 開發環境 E2E 測試（推薦）
npm run test:e2e:dev

# 生產環境 E2E 測試
npm run build
npm run test:e2e
```

## 🔧 開發指南

### 代碼規範

```bash
# 代碼檢查和修復
npm run lint

# 代碼格式化
npm run format
```

### 組件開發

項目提供了多個基礎組件，支援 TypeScript 泛型：

```typescript
// 表格組件範例
<BaseTable<UserData>
  :data="userData"
  :columns="tableColumns"
  :loading="loading"
  @selection-change="handleSelectionChange"
/>
```

### 類型定義

在 `src/types/index.ts` 中定義了通用類型：

```typescript
// 表格列配置
export interface TableColumn<T = Record<string, unknown>> {
  prop?: string
  label: string
  width?: number | string
  sortable?: boolean | 'custom'
  formatter?: (row: T) => string
}

// 排序變更事件
export type SortChangValue<T extends Record<string, unknown>> = {
  column: TableColumnCtx<T>[]
  order: string
  prop: string
}
```

### 樣式開發

項目支援多種樣式方案：

- **Tailwind CSS**: 原子化 CSS 框架
- **SCSS**: 支援變量、混入等進階功能
- **Element Plus**: UI 組件庫主題自定義

## 📝 開發建議

### IDE 設定

推薦使用 [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 擴展

### 自動導入

項目配置了自動導入功能，無需手動導入常用 API：

```typescript
// 自動導入 Vue API
const count = ref(0)
const doubled = computed(() => count.value * 2)

// 自動導入路由
const router = useRouter()
const route = useRoute()
```

### 組件註冊

使用 `unplugin-vue-components` 自動註冊組件，無需手動導入：

```vue
<template>
  <!-- 自動識別並導入 -->
  <el-button>按鈕</el-button>
  <BaseTable />
</template>
```

## 📄 相關文檔

- [Vue 3 文檔](https://vuejs.org/)
- [Element Plus 文檔](https://element-plus.org/)
- [Tailwind CSS 文檔](https://tailwindcss.com/)
- [Vite 文檔](https://vite.dev/)
- [TypeScript 文檔](https://www.typescriptlang.org/)

## 🤝 參與貢獻

1. Fork 本項目
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📜 授權條款

本項目採用 MIT 授權條款 - 查看 [LICENSE](LICENSE) 文件了解詳情
