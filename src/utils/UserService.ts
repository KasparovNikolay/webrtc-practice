import { $axios } from './axios'
import { IUser } from './types'
import { AxiosResponse } from 'axios'

export class UserService {
  static async getUser(): Promise<AxiosResponse<IUser>> {
    return $axios.post<IUser>('user')
  }
}
