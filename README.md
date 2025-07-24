# 🚀 @your-org/plugin-name

> 一個功能強大、類型安全且易於使用的 npm 插件開發模板

[![Build Status](https://github.com/your-org/plugin-name/workflows/CI/badge.svg)](https://github.com/your-org/plugin-name/actions)
[![Coverage](https://img.shields.io/codecov/c/github/your-org/plugin-name)](https://codecov.io/gh/your-org/plugin-name)
[![npm version](https://img.shields.io/npm/v/@your-org/plugin-name)](https://www.npmjs.com/package/@your-org/plugin-name)
[![npm downloads](https://img.shields.io/npm/dm/@your-org/plugin-name)](https://www.npmjs.com/package/@your-org/plugin-name)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ 特色功能

<table>
<tr>
<td width="50%">

### 🎯 **開發體驗**
- ✅ **TypeScript 原生支援** - 完整的類型推斷和 IntelliSense
- ✅ **零配置啟動** - 開箱即用，無需複雜設定
- ✅ **熱重載開發** - 快速的開發反饋循環
- ✅ **現代 ES 模組** - 支援 ESM 和 CommonJS

</td>
<td width="50%">

### 🛡️ **品質保證**
- ✅ **100% 測試覆蓋** - Vitest 驅動的完整測試套件
- ✅ **自動化 CI/CD** - GitHub Actions 持續整合
- ✅ **代碼品質檢查** - ESLint + Prettier 強制規範
- ✅ **多版本支援** - Node.js 16/18/20 兼容

</td>
</tr>
</table>

## 📦 快速安裝

```bash
# 使用 npm
npm install @your-org/plugin-name

# 使用 yarn  
yarn add @your-org/plugin-name

# 使用 pnpm
pnpm add @your-org/plugin-name
```

## 🚀 30 秒快速開始

```typescript
import { Plugin, createPlugin } from '@your-org/plugin-name'

// 🎯 方式一：類別實例化
const plugin = new Plugin({
  name: 'my-awesome-plugin',
  debug: true
})

await plugin.init()
const result = await plugin.execute({ data: 'Hello World!' })
console.log(result.data) // { processed: true, input: { data: 'Hello World!' } }

// 🎯 方式二：工廠函數（推薦）
const quickPlugin = createPlugin({ name: 'quick-start' })
const quickResult = await quickPlugin.execute('test-data')
```

## 📋 目錄

- [安裝與使用](#-快速安裝)
- [API 文檔](#-api-文檔)
- [進階配置](#-進階配置)
- [最佳實踐](#-最佳實踐)
- [故障排除](#-故障排除)
- [開發指南](#️-開發指南)
- [貢獻指南](#-貢獻指南)

## 📚 API 文檔

### Plugin 類別

#### 建構函數

```typescript
new Plugin(options?: PluginOptions)
```

**參數說明：**

| 參數 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `name` | `string` | `'default-plugin'` | 插件名稱 |
| `debug` | `boolean` | `false` | 開啟調試模式 |
| `config` | `Record<string, unknown>` | `{}` | 自訂配置物件 |

#### 核心方法

##### `init(): Promise<PluginResult>`

初始化插件，執行必要的設定程序。

```typescript
const plugin = new Plugin({ name: 'my-plugin' })
const result = await plugin.init()

if (result.success) {
  console.log('✅ 插件初始化成功')
} else {
  console.error('❌ 初始化失敗:', result.message)
}
```

##### `execute(input: unknown): Promise<PluginResult>`

執行插件的主要功能邏輯。

```typescript
// 支援任意類型的輸入
const result = await plugin.execute({
  action: 'process',
  data: [1, 2, 3, 4, 5],
  options: { format: 'json' }
})

console.log(result.success) // true
console.log(result.data)    // 處理後的結果
```

##### `getInfo(): { name: string; version: string }`

獲取插件的基本資訊。

```typescript
const info = plugin.getInfo()
console.log(`插件名稱: ${info.name}`)
console.log(`版本: ${info.version}`)
```

### 工廠函數

#### `createPlugin(options?: PluginOptions): Plugin`

快速創建插件實例的便利函數。

```typescript
// 快速創建
const plugin = createPlugin()

// 帶配置創建
const configuredPlugin = createPlugin({
  name: 'configured-plugin',
  debug: process.env.NODE_ENV === 'development'
})
```

### 工具函數

#### `isValidInput(input: unknown): boolean`

檢查輸入值是否有效（非 null 且非 undefined）。

```typescript
import { isValidInput } from '@your-org/plugin-name'

const data = getUserInput()
if (isValidInput(data)) {
  await plugin.execute(data)
} else {
  console.warn('無效的輸入數據')
}
```

## ⚙️ 進階配置

### 環境變數支援

```bash
# .env 文件
PLUGIN_DEBUG=true
PLUGIN_TIMEOUT=5000
PLUGIN_RETRY_COUNT=3
```

```typescript
const plugin = new Plugin({
  name: 'env-aware-plugin',
  debug: process.env.PLUGIN_DEBUG === 'true',
  config: {
    timeout: parseInt(process.env.PLUGIN_TIMEOUT || '3000'),
    retryCount: parseInt(process.env.PLUGIN_RETRY_COUNT || '1')
  }
})
```

### 自訂配置範例

```typescript
interface CustomConfig {
  apiEndpoint: string
  timeout: number
  retries: number
  authentication: {
    type: 'bearer' | 'basic'
    token: string
  }
}

const plugin = new Plugin({
  name: 'api-client-plugin',
  debug: true,
  config: {
    apiEndpoint: 'https://api.example.com',
    timeout: 10000,
    retries: 3,
    authentication: {
      type: 'bearer',
      token: process.env.API_TOKEN
    }
  } as CustomConfig
})
```

### 錯誤處理最佳實踐

```typescript
async function robustPluginUsage() {
  const plugin = createPlugin({ name: 'robust-plugin' })
  
  try {
    // 初始化
    const initResult = await plugin.init()
    if (!initResult.success) {
      throw new Error(`初始化失敗: ${initResult.message}`)
    }
    
    // 執行
    const executeResult = await plugin.execute(inputData)
    if (!executeResult.success) {
      throw new Error(`執行失敗: ${executeResult.message}`)
    }
    
    return executeResult.data
  } catch (error) {
    console.error('插件使用錯誤:', error)
    // 執行清理或回退邏輯
    throw error
  }
}
```

## 🎯 最佳實踐

### 1. 插件生命週期管理

```typescript
class MyService {
  private plugin: Plugin
  
  async initialize() {
    this.plugin = createPlugin({
      name: 'service-plugin',
      debug: process.env.NODE_ENV !== 'production'
    })
    
    await this.plugin.init()
  }
  
  async processData(data: unknown) {
    if (!this.plugin) {
      throw new Error('服務未初始化')
    }
    
    return await this.plugin.execute(data)
  }
  
  async shutdown() {
    // 執行清理邏輯
    console.log('服務正在關閉...')
  }
}
```

### 2. 批量處理

```typescript
async function batchProcess(items: unknown[]) {
  const plugin = createPlugin({ name: 'batch-processor' })
  await plugin.init()
  
  const results = await Promise.allSettled(
    items.map(item => plugin.execute(item))
  )
  
  const successful = results
    .filter((result): result is PromiseFulfilledResult<PluginResult> => 
      result.status === 'fulfilled' && result.value.success
    )
    .map(result => result.value.data)
  
  const failed = results
    .filter(result => 
      result.status === 'rejected' || 
      (result.status === 'fulfilled' && !result.value.success)
    )
  
  return { successful, failed, total: items.length }
}
```

### 3. 配置驗證

```typescript
import Joi from 'joi' // 或其他驗證庫

const configSchema = Joi.object({
  name: Joi.string().required(),
  debug: Joi.boolean().default(false),
  config: Joi.object({
    timeout: Joi.number().min(1000).max(30000).default(5000),
    retries: Joi.number().min(0).max(5).default(1)
  }).default({})
})

function createValidatedPlugin(options: PluginOptions) {
  const { error, value } = configSchema.validate(options)
  if (error) {
    throw new Error(`配置驗證失敗: ${error.message}`)
  }
  
  return new Plugin(value)
}
```

## 🐛 故障排除

### 常見問題

<details>
<summary><strong>Q: 插件初始化失敗怎麼辦？</strong></summary>

**A:** 檢查以下幾點：
1. 確認 Node.js 版本 >= 16
2. 檢查配置參數是否正確
3. 開啟 debug 模式查看詳細錯誤

```typescript
const plugin = new Plugin({ 
  name: 'debug-plugin', 
  debug: true  // 開啟調試模式
})
```
</details>

<details>
<summary><strong>Q: TypeScript 類型錯誤如何解決？</strong></summary>

**A:** 確保正確導入類型：
```typescript
import { Plugin, type PluginOptions, type PluginResult } from '@your-org/plugin-name'
```
</details>

<details>
<summary><strong>Q: 如何處理異步操作？</strong></summary>

**A:** 所有插件方法都返回 Promise，使用 async/await：
```typescript
async function usePlugin() {
  const plugin = createPlugin()
  await plugin.init()  // 等待初始化完成
  const result = await plugin.execute(data)  // 等待執行完成
  return result
}
```
</details>

### 調試技巧

```typescript
// 1. 開啟詳細日誌
const plugin = new Plugin({
  name: 'debug-plugin',
  debug: true,
  config: {
    logLevel: 'verbose'
  }
})

// 2. 檢查插件狀態
console.log('插件信息:', plugin.getInfo())

// 3. 驗證輸入數據
import { isValidInput } from '@your-org/plugin-name'
console.log('輸入是否有效:', isValidInput(yourData))
```

## 🛠️ 開發指南

### 本地開發環境

```bash
# 克隆專案
git clone https://github.com/your-org/plugin-name.git
cd plugin-name

# 安裝依賴
npm install

# 開發模式（文件監聽）
npm run dev

# 運行測試
npm test

# 測試覆蓋率
npm run test:coverage
```

### 專案結構說明

```
📁 plugin-name/
├── 📂 src/                    # 源碼目錄
│   ├── 📄 index.ts            # 主入口文件
│   └── 📄 utils.ts            # 工具函數
├── 📂 test/                   # 測試目錄
│   ├── 📄 index.test.ts       # 主功能測試
│   └── 📄 utils.test.ts       # 工具函數測試
├── 📂 examples/               # 使用範例
│   └── 📄 basic-usage.js      # 基本使用範例
├── 📂 lib/                    # 構建輸出（自動生成）
├── 📂 .github/workflows/      # CI/CD 配置
├── 📄 package.json            # 包配置
├── 📄 tsconfig.json           # TypeScript 配置
├── 📄 vite.config.ts          # 構建配置
└── 📄 vitest.config.ts        # 測試配置
```

### 開發腳本說明

| 命令 | 說明 |
|------|------|
| `npm run dev` | 開發模式，監聽文件變更自動重建 |
| `npm run build` | 構建生產版本 |
| `npm run test` | 運行測試套件 |
| `npm run test:coverage` | 生成測試覆蓋率報告 |
| `npm run lint` | 代碼檢查 |
| `npm run lint:fix` | 自動修復代碼問題 |
| `npm run format` | 格式化代碼 |
| `npm run type-check` | TypeScript 類型檢查 |

### 添加新功能

1. **新增功能到 `src/index.ts`**
```typescript
export class Plugin {
  // 新增方法
  async newFeature(input: string): Promise<string> {
    // 實現邏輯
    return `processed: ${input}`
  }
}
```

2. **添加對應測試到 `test/index.test.ts`**
```typescript
describe('newFeature', () => {
  it('should process input correctly', async () => {
    const plugin = new Plugin()
    const result = await plugin.newFeature('test')
    expect(result).toBe('processed: test')
  })
})
```

3. **更新 README 和範例**

## 🤝 貢獻指南

我們歡迎所有形式的貢獻！請閱讀以下指南：

### 🚀 快速開始貢獻

1. **Fork 專案** 
2. **創建功能分支**: `git checkout -b feature/amazing-feature`
3. **提交變更**: `git commit -m 'feat: add amazing feature'`
4. **推送分支**: `git push origin feature/amazing-feature`
5. **開啟 Pull Request**

### 📝 提交規範

我們使用 [Conventional Commits](https://www.conventionalcommits.org/) 規範：

```bash
feat: 新功能
fix: 錯誤修復
docs: 文檔更新
style: 代碼格式調整
refactor: 代碼重構
test: 測試相關
chore: 建構工具或輔助工具的變動
```

### ✅ 貢獻檢查清單

- [ ] 代碼通過所有測試 (`npm test`)
- [ ] 代碼符合 linting 規範 (`npm run lint`)
- [ ] 已添加相應的測試用例
- [ ] 更新了相關文檔
- [ ] 提交信息符合規範

## 📄 授權條款

本專案採用 [MIT License](LICENSE) 授權條款。

## 🔗 相關連結

- 📖 [完整文檔](https://your-org.github.io/plugin-name)
- 🐛 [問題回報](https://github.com/your-org/plugin-name/issues)
- 💬 [討論區](https://github.com/your-org/plugin-name/discussions)
- 📦 [npm 套件](https://www.npmjs.com/package/@your-org/plugin-name)
- 🔄 [更新日誌](CHANGELOG.md)

## 🙏 致謝

感謝所有對這個專案做出貢獻的開發者們！

<a href="https://github.com/your-org/plugin-name/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=your-org/plugin-name" />
</a>

---

<div align="center">

**如果這個專案對您有幫助，請給它一個 ⭐ 星標！**

Made with ❤️ by [Your Name](https://github.com/your-username)

</div>
