import Modal from 'antd/es/modal/Modal'
import React from 'react'
import Input from 'antd/es/input'
import Form from 'antd/es/form'
import { Link } from 'react-router-dom'
import Title from 'antd/es/typography/Title'

import s from './signup.module.css'

export const LoginPage = () => {
  return (
    <div className={s.wrapper}>
      <Modal title={<Title className={s.title}>Вход</Title>} open closable={false} centered>
        <Form layout='vertical'>
          <Form.Item name='login' label='Email' rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name='password' label='Пароль' rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <span>Если у вас нет учетной записи, то</span> <Link to='/signup'>зарегистрируйтесь</Link>
        </Form>
      </Modal>
    </div>
  )
}
