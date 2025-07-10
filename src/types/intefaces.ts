import { Forms, UserType } from './enums'

export interface IAuthFormsProps {
  setShowForm: (form: Forms) => void
}

export interface IUser {
  _id: string
  email: string
  username: string
  token: string
  type: UserType
}

export interface APIResponse<T> {
  message: string
  data: T
}

export interface ICurrency {
  _id: string
  name: string
  country: string
  code: string
  ratio: number
}

export interface IConvertResponse {
  message: string
  from: string
  to: string
  amount: number
  result: number
}

export interface IAlertMessage {
  success: string
  error: string
}
