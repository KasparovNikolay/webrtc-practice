import React, { useEffect, useState } from 'react'
import socket from '../utils/socket'
import { PeerConnection } from '../utils/peer-connection'
import CallWindow from '../components/CallWindow/CallWindow'
import { CallModal } from '../components/CallModal/CallModal'
import { ConfigType, PeerConnectionType, MediaStreamType } from '../utils/types'
import { Dashboard } from '../components/Dashboard/Dashboard'
import { CallToModal } from '../components/CallToModal/CallToModal'

const Main = () => {
  const [callFrom, setCallFrom] = useState('')
  const [calling, setCalling] = useState(false)

  // показывает модалку что кто-то звонит
  const [showModal, setShowModal] = useState(false)

  const [localSrc, setLocalSrc] = useState<MediaStreamType>(null)
  const [remoteSrc, setRemoteSrc] = useState<MediaStreamType>(null)

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
      .on('end', () => finishCall(false))
  }, [pc])

  const startCall = (isCaller: boolean, remoteId: string, config: ConfigType) => {
    setShowModal(false)
    setCalling(true)
    setConfig(config)

    const connection = new PeerConnection(remoteId)
      .on('localStream', (stream) => {
        setLocalSrc(stream)
      })
      .on('remoteStream', (stream) => {
        setRemoteSrc(stream)
        setCalling(false)
      })
      .start(isCaller, config)

    setPc(connection)
  }

  const rejectCall = () => {
    socket.emit('end', { to: callFrom })

    setShowModal(false)
  }

  const finishCall = (isCaller: boolean) => {
    pc?.stop?.(isCaller)

    setPc(null)
    setConfig(null)

    setCalling(false)
    setShowModal(false)

    setLocalSrc(null)
    setRemoteSrc(null)
  }

  return (
    <>
      <Dashboard startCall={startCall} />
      <CallToModal isCalling={calling} onReject={() => finishCall(true)} />
      <CallModal
        showModal={showModal}
        callFrom={callFrom}
        startCall={startCall}
        rejectCall={rejectCall}
      />
      {remoteSrc && (
        <CallWindow
          localSrc={localSrc}
          remoteSrc={remoteSrc}
          config={config}
          mediaDevice={pc?.mediaDevice}
          finishCall={finishCall}
        />
      )}
    </>
  )
}

export default Main
