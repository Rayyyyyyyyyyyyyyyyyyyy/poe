// API 配置
export const API_CONFIG = {
  // 開發環境使用代理路徑，生產環境使用完整 URL
  BASE_URL: import.meta.env.DEV ? '/api' : 'https://sap-pe-poc.cfapps.us10-001.hana.ondemand.com',

  // API 端點
  ENDPOINTS: {
    MATERIALS: '/sap/materials',
  },

  // 請求配置
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },

  // 超時設置 (毫秒)
  TIMEOUT: 30000,
}

// 構建完整的 API URL
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`
}
