export interface TradeInfo {
  trade: string
  book: string
  product: string
}
export interface UserInfo {
  email: string
}
export interface User {
  email: string
  password: string
}
export interface CsrfToken {
  csrf_token: string
}
