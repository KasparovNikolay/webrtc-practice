import { makeAutoObservable } from 'mobx'
import { IUser } from './types'
import { AuthService } from './AuthService'
import { AxiosError } from 'axios'

export class Store {
  user = {}
  isAuthed = false

  constructor() {
    makeAutoObservable(this)
  }

  setIsAuthed(value: boolean) {
    this.isAuthed = value
  }

  setUser(value: IUser) {
    this.user = value
  }

  async login(email: string, password: string) {
    try {
      const { data } = await AuthService.login(email, password)
      localStorage.setItem('Authorization', data.accessToken)
      this.setIsAuthed(true)
      this.setUser(data.user)
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data.message)
      }
    }
  }

  async registration(email: string, password: string) {
    try {
      const { data } = await AuthService.registration(email, password)
      localStorage.setItem('Authorization', data.accessToken)
      this.setIsAuthed(true)
      this.setUser(data.user)
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data.message)
      }
    }
  }

  async logout() {
    try {
      await AuthService.logout()
      localStorage.removeItem('Authorization')
      this.setIsAuthed(false)
      this.setUser({} as IUser)
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data.message)
      }
    }
  }
}
