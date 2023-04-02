import React, { FC, useState } from 'react'

// TODO: обязательно пофиксить импорт
import { Popover } from 'antd'
import Title from 'antd/es/typography/Title'
import Button from 'antd/es/button/button'

import SnippetsOutlined from '@ant-design/icons/SnippetsOutlined'

import { useClipBoard } from '../../utils/use-clipboard'
import Row from 'antd/es/grid/row'

export const DashboardUserCard: FC<{ userId: string }> = ({ userId }) => {
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
      <Row justify='center' align='middle'>
        <p>{userId}</p>
        <Popover content={null} open={showCopyNotification} title='Copied!' trigger='click'>
          <Button onClick={handleCopy}>
            <SnippetsOutlined />
          </Button>
        </Popover>
      </Row>
      {/* <img src={user?.picture} alt='' /> */}
      {/* <p>{user?.name}</p> */}
    </div>
  )
}
