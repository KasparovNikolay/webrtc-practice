import { FC, useEffect, useRef, useState } from 'react'
import { MediaDevice, MediaType } from '../../utils/media-device'
import { ConfigType, MediaStreamType, SizeType, VideoRef } from '../../utils/types'

type CallWindowPropsType = {
  remoteSrc: MediaStreamType
  localSrc: MediaStreamType
  config: ConfigType
  mediaDevice: MediaDevice | undefined
  finishCall: (val: boolean) => void
}

export const CallWindow: FC<CallWindowPropsType> = ({
  remoteSrc,
  localSrc,
  config,
  mediaDevice,
  finishCall,
}) => {
  const remoteVideo = useRef<VideoRef>(null)
  const localVideo = useRef<VideoRef>(null)
  const localVideoSize = useRef<SizeType>(null)
  const [video, setVideo] = useState(config?.video)
  const [audio, setAudio] = useState(config?.audio)

  const [dragging, setDragging] = useState(false)
  const [coords, setCoords] = useState({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    const { width, height } = (localVideo.current as HTMLElement).getBoundingClientRect()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    localVideoSize.current = { width, height }
  }, [])

  useEffect(() => {
    if (!localVideo.current) return
    dragging
      ? localVideo.current.classList.add('dragging')
      : localVideo.current.classList.remove('dragging')
  }, [dragging])

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
    }
  })

  useEffect(() => {
    if (remoteVideo.current && remoteSrc) {
      remoteVideo.current.srcObject = remoteSrc
    }
    if (localVideo.current && localSrc) {
      localVideo.current.srcObject = localSrc
    }
  }, [remoteSrc, localSrc])

  useEffect(() => {
    if (mediaDevice) {
      mediaDevice.toggle('Video', video)
      mediaDevice.toggle('Audio', audio)
    }
  }, [mediaDevice])

  const onMouseMove = (e: MouseEvent) => {
    if (dragging && localVideoSize.current) {
      setCoords({
        x: e.clientX - localVideoSize.current.width / 2,
        y: e.clientY - localVideoSize.current.height / 2,
      })
    }
  }

  const toggleMediaDevice = (deviceType: MediaType) => () => {
    if (deviceType === 'Video') {
      setVideo(!video)
      mediaDevice?.toggle('Video')
    }
    if (deviceType === 'Audio') {
      setAudio(!audio)
      mediaDevice?.toggle('Audio')
    }
  }

  const handleFinishCall = () => finishCall(true)

  const handleVideoClick = () => setDragging(!dragging)

  return (
    <div className='call-window'>
      <div className='inner'>
        <div className='video'>
          <video className='remote' ref={remoteVideo} autoPlay />
          <video
            className='local'
            ref={localVideo}
            autoPlay
            muted
            onClick={handleVideoClick}
            style={{
              top: `${coords.y}px`,
              left: `${coords.x}px`,
            }}
          />
        </div>
        <div className='control'>
          <button className={video ? '' : 'reject'} onClick={toggleMediaDevice('Video')}>
            <span>BsCameraVideo</span>
          </button>
          <button className={audio ? '' : 'reject'} onClick={toggleMediaDevice('Audio')}>
            <span>BsPhone</span>
          </button>
          <button className='reject' onClick={handleFinishCall}>
            <span>FiPhoneOff</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CallWindow
