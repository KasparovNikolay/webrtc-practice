import { FC } from 'react'
import { Callback, StartCallFn } from '../../utils/types'
import Button from 'antd/lib/button/Button'
import Paragraph from 'antd/lib/typography/Paragraph'
import Modal from 'antd/lib/modal/Modal'
import Avatar from 'antd/lib/avatar/avatar'

import { PhoneFilled, CameraFilled, UserOutlined, CloseCircleFilled } from '@ant-design/icons'

type CallModalPropsType = {
  callFrom: string
  startCall: StartCallFn
  rejectCall: Callback
  showModal: boolean
}

export const CallModal: FC<CallModalPropsType> = ({
  callFrom,
  startCall,
  rejectCall,
  showModal,
}) => {
  const acceptWithVideo = (video: boolean) => () => {
    const config = { audio: true, video }
    startCall(false, callFrom, config)
  }

  return (
    <Modal title='Входящий звонок' open={showModal} onCancel={rejectCall} footer={null} centered>
      <Avatar size={64} icon={<UserOutlined />} />
      <Paragraph>{`${callFrom} is calling`}</Paragraph>
      <div>
        <Button onClick={acceptWithVideo(true)}>
          <CameraFilled />
        </Button>
        <Button onClick={acceptWithVideo(false)}>
          <PhoneFilled />
        </Button>
        <Button onClick={rejectCall} className='reject'>
          <CloseCircleFilled />
        </Button>
      </div>
    </Modal>
  )
}
