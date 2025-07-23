export const ROUTES = {
  // 根路由
  ROOT: '/',

  // 登入頁
  LOGIN:'/login',
  // 錯誤頁面
  NOT_FOUND: '/:catchAll(.*)',
  NO_AUTHORITY: '/no-authority'
} as const

export const ROUTE_NAMES = {
  ROOT: 'Root',
  LOGIN: 'Login',

  // 錯誤頁面
  NOT_FOUND: 'NotFoundPage',
  NO_AUTHORITY: 'NoAuthority'
} as const
