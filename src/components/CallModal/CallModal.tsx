import { FC } from 'react'
import { Callback, StartCallFn } from '../../utils/types'

type CallModalPropsType = {
  callFrom: string
  startCall: StartCallFn
  rejectCall: Callback
}

export const CallModal: FC<CallModalPropsType> = ({ callFrom, startCall, rejectCall }) => {
  const acceptWithVideo = (video: boolean) => () => {
    const config = { audio: true, video }
    startCall(false, callFrom, config)
  }

  return (
    <div className='call-modal'>
      <div className='inner'>
        <p>{`${callFrom} is calling`}</p>
        <div className='control'>
          <button onClick={acceptWithVideo(true)}>
            <span>BsCameraVideo</span>
          </button>
          <button onClick={acceptWithVideo(false)}>
            <span>BsPhone</span>
          </button>
          <button onClick={rejectCall} className='reject'>
            <span>FiPhoneOff</span>
          </button>
        </div>
      </div>
    </div>
  )
}
