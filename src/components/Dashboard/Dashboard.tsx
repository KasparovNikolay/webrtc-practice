import { ChangeEvent, FC, useEffect, useState } from 'react'

import Input from 'antd/es/input/Input'
import Button from 'antd/es/button/Button'

import VideoCameraOutlined from '@ant-design/icons/VideoCameraOutlined'
import CustomerServiceOutlined from '@ant-design/icons/CustomerServiceOutlined'

import socket from '../../utils/socket'
import { StartCallFn } from '../../utils/types'
import { DashboardUserCard } from '../DashboardUserCard/DashboardUserCard'

type MainWindowPropsType = { startCall: StartCallFn }

export const Dashboard: FC<MainWindowPropsType> = ({ startCall }) => {
  const [localId, setLocalId] = useState('')
  const [remoteId, setRemoteId] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    socket.on('init', ({ id }) => setLocalId(id)).emit('init')
  }, [])

  const callWithVideo = (video: boolean) => () => {
    if (!remoteId.trim()) {
      return setError('Your friend ID must be specified!')
    }
    const config = { audio: true, video }
    startCall(true, remoteId, config)
  }

  const handleChangeFriendId = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setError('')
    setRemoteId(value)
  }

  return (
    <div>
      <DashboardUserCard userId={localId} />
      <div>
        <label htmlFor='remoteId'>Your friend ID</label>
        <p>{error}</p>
        <Input
          type='text'
          spellCheck={false}
          placeholder='Enter friend ID'
          onChange={handleChangeFriendId}
        />
        <div className='control'>
          <Button onClick={callWithVideo(true)}>
            <VideoCameraOutlined />
          </Button>
          <Button onClick={callWithVideo(false)}>
            <CustomerServiceOutlined />
          </Button>
        </div>
      </div>
    </div>
  )
}
