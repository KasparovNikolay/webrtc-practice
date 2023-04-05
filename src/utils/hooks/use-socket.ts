import { useEffect, useState } from 'react'
import { ConfigType, MediaStreamType, PeerConnectionType } from '../types'
import { socket } from '../socket'
import { PeerConnection } from '../peer-connection'

export const useSocket = () => {
  const [callFrom, setCallFrom] = useState('')
  const [calling, setCalling] = useState(false)

  // показывает модалку что кто-то звонит
  const [showModal, setShowModal] = useState(false)

  const [localMediaStream, setLocalMediaStream] = useState<MediaStreamType>(null)
  const [remoteMediaStream, setRemoteMediaStream] = useState<MediaStreamType>(null)

  const [pc, setPc] = useState<PeerConnectionType>(null)
  const [config, setConfig] = useState<ConfigType>(null)

  useEffect(() => {
    socket.on('request', ({ from }) => {
      setCallFrom(from)
      setShowModal(true)
    })
  }, [])

  useEffect(() => {
    if (!pc) return

    socket
      .on('call', (data) => {
        if (data.sdp) {
          pc.setRemoteDescription(data.sdp)

          if (data.sdp.type === 'offer') {
            pc.createAnswer()
          }
        } else {
          pc.addIceCandidate(data.candidate)
        }
      })
      .on('end', () => handleFinishCall(false))
  }, [pc])

  const handleStartCall = (isCaller: boolean, remoteId: string, config: ConfigType) => {
    setShowModal(false)
    setCalling(true)
    setConfig(config)

    const connection = new PeerConnection(remoteId)
      .on('localStream', (stream) => {
        setLocalMediaStream(stream)
      })
      .on('remoteStream', (stream) => {
        setRemoteMediaStream(stream)
        setCalling(false)
      })
      .start(isCaller, config)

    setPc(connection)
  }

  const handleRejectCall = () => {
    socket.emit('end', { to: callFrom })

    setShowModal(false)
  }

  const handleFinishCall = (isCaller: boolean) => {
    pc?.stop?.(isCaller)

    setPc(null)
    setConfig(null)

    setCalling(false)
    setShowModal(false)

    setLocalMediaStream(null)
    setRemoteMediaStream(null)
  }

  return {
    pc,
    config,
    calling,
    callFrom,
    showModal,
    localMediaStream,
    remoteMediaStream,
    handleFinishCall,
    handleRejectCall,
    handleStartCall,
  }
}
