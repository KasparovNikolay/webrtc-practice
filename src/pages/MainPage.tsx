import { useEffect, useState } from 'react'

import { CallModal } from '../components/CallModal/CallModal'
import { Dashboard } from '../components/Dashboard/Dashboard'
import { CallWindow } from '../components/CallWindow/CallWindow'
import { CallToModal } from '../components/CallToModal/CallToModal'

import { socket } from '../utils/socket'
import { PeerConnection } from '../utils/peer-connection'
import { ConfigType, PeerConnectionType, MediaStreamType } from '../utils/types'
// import Row from 'antd/es/grid/row'
// import Col from 'antd/es/grid/col'

export const MainPage = () => {
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
      {/* <Row> */}
      {/*   <Col span={10}> */}
      <Dashboard startCall={startCall} />
      {/*   </Col> */}
      {/*   <Col span={10}>/!* col-6 col-pull-18 *!/</Col> */}
      {/* </Row> */}
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
