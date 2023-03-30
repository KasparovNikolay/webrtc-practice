import { FC, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

// TODO: обязательно пофиксить импорт
import { Popover } from 'antd'
import Title from 'antd/es/typography/Title'
import Button from 'antd/es/button/button'

import SnippetsOutlined from '@ant-design/icons/SnippetsOutlined'

import { useClipBoard } from '../../utils/use-clipboard'

export const DashboardUserCard: FC<{ userId: string }> = ({ userId }) => {
  const { user } = useAuth0()
  const { setValue } = useClipBoard()

  const [showCopyNotification, setShowCopyNotification] = useState(false)

  const handleCopy = () => {
    setShowCopyNotification(true)
    setValue(userId)
    setTimeout(() => setShowCopyNotification(false), 2000)
  }

  return (
    <div>
      <Title>Your ID is</Title>
      <div>
        <p>{userId}</p>
        <Popover content={null} open={showCopyNotification} title='Copied!' trigger='click'>
          <Button onClick={handleCopy}>
            <SnippetsOutlined />
          </Button>
        </Popover>
      </div>
      <img src={user?.picture} alt='' />
      <p>{user?.name}</p>
    </div>
  )
}
