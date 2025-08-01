import type { Pager, TableListReq } from 'src/types'

export const uploadAcceptList = '.xlsx,.xls,.xlsm,.xlsb,.xltx,.xltm,.xlt,.xlam,.xla,.xlw,.xlr'

export const formBaseWidth = '100px'

export const basicDateFormat = 'YYYY/MM/DD'

export const DEFAULT_PAGER: Pager = {
  page: 0,
  limit: 0,
  totalCount: 0
}

export enum ESort {
  descending = 'desc',
  ascending = 'asc'
}

export const DEFAULT_PAYLOAD: TableListReq = {
  page: 1,
  limit: 10
}

export const uploadOptions = [
  {
    label: '下載XML',
    value: 'downloadXML'
  },
  {
    label: '下載+上傳',
    value: 'downloadAndUpload'
  },
  {
    label: '直接上傳',
    value: 'upload'
  }
]

export const yesNoOptions = [
  { label: '是', value: 'true' },
  { label: '否', value: 'false' }
]

export enum EInvoiceStatus {
  '' = '尚未取號',
  DRAFT = '暫存取號',
  ISSUED = '取號',
  VOIDED = '作廢'
}

// 從配置生成選項數組
export const invoiceStatusOptions = [
  { label: '尚未取號', value: '' },
  { label: '暫存取號', value: 'DRAFT' },
  { label: '取號', value: 'ISSUED' },
  { label: '作廢', value: 'VOIDED' }
]

// 狀態標籤查詢函數
export const getInvoiceStatusLabel = (status: string): string => {
  if (status === '') return '尚未取號'
  return EInvoiceStatus[status as keyof typeof EInvoiceStatus] ?? status
}

export enum EInvoiceUploadStatus {
  '' = '-',
  ISSUED = '完成',
  VOIDED = '尚未上傳'
}

export enum EInvoiceLogStatus {
  take_gui_number = '取號',
  printed = '列印',
  uploaded = '已上傳',
  pending = '尚未上傳',
  success = '上傳成功'
}

// 上傳狀態標籤查詢函數
export const getUploadStatusLabel = (status: string): string => {
  if (status === '') return '-'
  return EInvoiceUploadStatus[status as keyof typeof EInvoiceUploadStatus] ?? status
}

export enum ESystemOptions {
  taxType = 'TAX_TYPE',
  inOutTaxCategory = 'IN_OUT_TAX_CATEGORY',
  invoiceType = 'INVOICE_TYPE',
  taxPurpose = 'TAX_PURPOSE',
  regionalTaxAuthority = 'KR_TAXOFF',
  businessTaxDeclarationType = 'BIZ_DECL_TYPE',
  deductionCode = 'DEDUCTION_CODE',
  b2CMode = 'B2C_MODE',
  invoiceMode = 'INVOICE_MODE'
}
export const systemOptionKeys = [
  'TAX_TYPE',
  'IN_OUT_TAX_CATEGORY',
  'INVOICE_TYPE',
  'TAX_PURPOSE',
  'KR_TAXOFF',
  'BIZ_DECL_TYPE',
  'DEDUCTION_CODE',
  'B2C_MODE',
  'INVOICE_MODE'
]

// where in key
export const baseFilterIn = ['id', 'company']
export const BPIn = [
  'businessPlace',
  'isNaturalPerson',
  'isSupplier',
  'isCustomer',
  'invoiceMergeFlag',
  'bpNo'
]
export const taxCodeIn = ['taxCode', 'inOutTaxCategory', 'taxType', 'deductionCode', 'invoiceType']
export const groupIn = ['guiGroup.guiGroupCode', 'businessPlace.company']
export const yseNoIn = [
  'isEInvoice',
  'isNaturalPerson',
  'isSupplier',
  'isCustomer',
  'invoiceMergeFlag',
  'active'
]
export const userIn = ['email', 'isActive']
export const taxDetailIn = [
  'companyId',
  'businessPlaceId',
  'accountingDocYear',
  'companyCodeCurrency',
  'transactionCurrency'
]
export const invoiceIssueIn = ['guiStatus']
export const inItem = [
  ...baseFilterIn,
  ...BPIn,
  ...taxCodeIn,
  ...groupIn,
  ...yseNoIn,
  ...userIn,
  ...taxDetailIn,
  ...invoiceIssueIn
]

export const dateItem = ['guiDate', 'customsDeclarationDate']
export const dateRangeItem = ['lastInvoiceDate', 'voidedTime', 'postingDate']
