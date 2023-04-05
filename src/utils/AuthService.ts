import { AxiosResponse } from 'axios'
import { ILoginResponse } from './types'
import { $axios } from './axios'

export class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<ILoginResponse>> {
    return $axios.post<ILoginResponse>('/login', { email, password })
  }

  static async logout(): Promise<void> {
    await $axios.post<ILoginResponse>('/logout')
  }

  static async registration(
    email: string,
    password: string,
  ): Promise<AxiosResponse<ILoginResponse>> {
    return $axios.post<ILoginResponse>('/signup', { email, password })
  }
}
