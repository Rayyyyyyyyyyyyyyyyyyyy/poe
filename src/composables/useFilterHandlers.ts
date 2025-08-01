import { reactive } from 'vue'

export interface FilterHandlersOptions {
  onFilterChange: (filterData: Record<string, Record<string, unknown>>) => void
}

/**
 * 標準化過濾值，將 string | string[] 轉換為 string[]
 * @param val 輸入值
 * @param fallback 當 val 為空時的備用值
 * @returns 標準化後的 string[]
 */
export function normalizeFilterValue(val?: string | string[], fallback?: string[]): string[] {
  if (Array.isArray(val)) {
    return val
  } else if (val) {
    return [val]
  } else {
    return fallback || []
  }
}

/**
 * 處理過濾邏輯的 composable
 * @param options 配置選項
 * @returns 過濾相關方法和狀態
 */
export function useFilterHandlers<T extends string>(options: FilterHandlersOptions) {
  const { onFilterChange } = options

  // 過濾數據狀態
  const filterData = reactive<Record<string, Record<string, unknown>>>({})

  /**
   * 更新過濾值
   * @param data 過濾數據
   */
  const updateFilterValue = (data: { key: T; value: string | string[] }) => {
    if (Array.isArray(data.value) && data.value.length === 0) {
      // 如果是空數組，刪除該過濾條件
      delete filterData[data.key]
    } else {
      if (data.key == 'validFrom') {
        filterData[data.key] = { gte: data.value }
      } else if (data.key == 'validTo') {
        filterData[data.key] = { lte: data.value }
      } else {
        filterData[data.key] = { contains: data.value }
      }
    }
    // 通知過濾變更
    onFilterChange(filterData)
  }

  /**
   * 重置過濾條件
   */
  const resetFilter = () => {
    // 清空所有過濾條件
    Object.keys(filterData).forEach((key) => {
      delete filterData[key]
    })
    // 通知過濾變更
    onFilterChange(filterData)
  }

  return {
    filterData,
    updateFilterValue,
    resetFilter,
  }
}
