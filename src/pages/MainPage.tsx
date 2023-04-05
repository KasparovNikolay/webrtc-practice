import { Profile } from '../components/Profile/Profile'
import { CallModal } from '../components/CallModal/CallModal'
import { Dashboard } from '../components/Dashboard/Dashboard'
import { CallWindow } from '../components/CallWindow/CallWindow'
import { CallToModal } from '../components/CallToModal/CallToModal'

import Row from 'antd/es/grid/row'
import Col from 'antd/es/grid/col'
import { useSocket } from '../utils/use-socket'

export const MainPage = () => {
  const {
    handleFinishCall,
    handleRejectCall,
    handleStartCall,
    pc,
    config,
    calling,
    callFrom,
    showModal,
    localMediaStream,
    remoteMediaStream,
  } = useSocket()

  return (
    <>
      <Row>
        <Col span={10}>
          <Dashboard startCall={handleStartCall} />
        </Col>
        <Col span={10}>
          <Profile />
        </Col>
      </Row>
      <CallToModal isCalling={calling} onReject={() => handleFinishCall(true)} />
      <CallModal
        showModal={showModal}
        callFrom={callFrom}
        startCall={handleStartCall}
        rejectCall={handleRejectCall}
      />
      {remoteMediaStream && (
        <CallWindow
          localSrc={localMediaStream}
          remoteSrc={remoteMediaStream}
          config={config}
          mediaDevice={pc?.mediaDevice}
          finishCall={handleFinishCall}
        />
      )}
    </>
  )
}
