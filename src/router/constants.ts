export const ROUTES = {
  // 根路由
  ROOT: '/',
  HOME: '/home',

  // 登入頁
  LOGIN: '/login',
  // 錯誤頁面
  NOT_FOUND: '/:catchAll(.*)',
  NO_AUTHORITY: '/no-authority',
} as const

export const ROUTE_NAMES = {
  HOME_LAYOUT: 'HomeLayout',
  LOGIN: 'Login',
  HOME: 'Home',

  // 錯誤頁面
  NOT_FOUND: 'NotFoundPage',
  NO_AUTHORITY: 'NoAuthority',
} as const
