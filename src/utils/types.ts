import { PeerConnection } from './peer-connection'

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
