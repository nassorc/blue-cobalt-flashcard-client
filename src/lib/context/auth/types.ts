export interface AuthStateType {
  userId: string,
  token: string,
  loading: boolean,
  error?: string | null,
}
export interface AuthActionType {
  type: string,
  payload?: {
    userId?: string,
    token?: string,
    error?: string
  }
}