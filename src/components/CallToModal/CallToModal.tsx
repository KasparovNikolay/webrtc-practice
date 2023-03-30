import React, { FC } from 'react'
import Modal from 'antd/es/modal/Modal'
import Spin from 'antd/es/spin'

interface ICallToModalProps {
  isCalling: boolean
  onReject: () => void
}

export const CallToModal: FC<ICallToModalProps> = ({ onReject, isCalling }) => {
  return (
    <Modal open={isCalling} footer={null}>
      <Spin tip='Loading' size='large'></Spin>
      {/* TODO: при отмене звонка,у собеседника звонок не исчезает  */}
      <button onClick={onReject}>
        <span>reject call</span>
      </button>
      <button disabled>
        <span>BsPhoneVibrate</span>
      </button>
    </Modal>
  )
}
