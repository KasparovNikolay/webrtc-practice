import { FC, useEffect, useRef, useState } from 'react'
import { MediaDevice, MediaType } from '../../utils/media-device'
import { ConfigType, MediaStreamType, Nullable, SizeType, VideoRef } from '../../utils/types'
import VideoCameraOutlined from '@ant-design/icons/VideoCameraOutlined'
import CustomerServiceOutlined from '@ant-design/icons/CustomerServiceOutlined'
import PoweroffOutlined from '@ant-design/icons/PoweroffOutlined'
import styles from './CallWindow.module.css'
import Button from 'antd/es/button/Button'

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
  const localVideoSize = useRef<Nullable<SizeType>>(null)
  const [video, setVideo] = useState(config?.video)
  const [audio, setAudio] = useState(config?.audio)

  const [dragging, setDragging] = useState(false)
  const [coords, setCoords] = useState({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    const { width, height } = (localVideo.current as HTMLElement).getBoundingClientRect()

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
    <div className={styles.container}>
      <div className={styles.video}>
        <video className={styles.remote} ref={remoteVideo} autoPlay />
        <video
          className={styles.local}
          ref={localVideo}
          autoPlay
          muted
          onClick={handleVideoClick}
          style={{
            top: `${coords.y}px`,
            left: `${coords.x}px`,
          }}
        />
        <div className={styles.control}>
          <Button className={video ? '' : 'reject'} onClick={toggleMediaDevice('Video')}>
            <VideoCameraOutlined />
          </Button>
          <Button className={audio ? '' : 'reject'} onClick={toggleMediaDevice('Audio')}>
            <CustomerServiceOutlined />
          </Button>
          <Button onClick={handleFinishCall}>
            <PoweroffOutlined />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CallWindow
