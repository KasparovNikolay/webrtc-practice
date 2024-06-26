import { ChangeEvent } from 'react'
import { PeerConnection } from './peer-connection'

export type MediaType = 'Video' | 'Audio'

export type ConfigType = null | {
  video: boolean
  audio: boolean
}

export type StartCallFn = (isCaller: boolean, remoteId: string, config: ConfigType) => void

export type Callback = () => void

export type MediaStreamType = MediaStream | null

export type PeerConnectionType = null | PeerConnection

export type Nullable<T> = null | T

export type VideoRef = Nullable<HTMLVideoElement>

export type SizeType = Record<'width' | 'height', number>

export type OnInputChangeEvent = ChangeEvent<HTMLInputElement>

// data type

export interface IUser {
  id: string
  email: string
  name?: string
}

export interface ILoginResponse {
  accessToken: string
  refreshToken: string
  user: IUser
}
