
// SAP 詳細記錄接口
export interface DetailRecord {
  deliveryDocument?: string
  deliveryDocumentItem?: string
  actualDeliveredQtyInBaseUnit?: string
  actualDeliveryQuantity?: string
  baseUnit?: string
  creationDate?: string
  creationTime?: string
  deliveryDocumentItemText?: string
  material?: string
  plant?: string
  storageLocation?: string
  goodsMovementType?: string
  goodsMovementStatus?: string
  deliveryRelatedBillingStatus?: string
  deliveryVersion?: string
  itemGrossWeight?: string
  itemNetWeight?: string
  itemWeightUnit?: string
  profitabilitySegment?: string
  profitCenter?: string
  [key: string]: unknown
}


// API 請求載荷類型
export interface MaterialsRequest {
  materials: string[]
  plants: string[]
  storageLocation: string[]
}

// API 響應類型 - 根據實際響應結構（數組）
export type MaterialsApiResponse = ApiMaterialItem[]

// API 回應數據項目類型（根據真實 API 響應）
export interface ApiMaterialItem {
  material: string
  plant: string
  storageLocation: string
  soCount: number
  dnCount: number
  stockQty: number
  soDetails: DetailRecord[]
  dnDetails: DetailRecord[]
  stockDetails: DetailRecord[]
}

// SAP 材料項目類型（用於前端處理，包含分組信息）
export interface MaterialItem {
  material: string
  plant: string
  storageLocation: string
  soCount: number
  dnCount: number
  stockQty: number
  soDetails: DetailRecord[]
  dnDetails: DetailRecord[]
  stockDetails: DetailRecord[]
  // 用於標識行類型（前端分組顯示用）
  rowType?: 'data' | 'subtotal' | 'total'
}

