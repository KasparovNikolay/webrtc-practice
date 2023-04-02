import Modal from 'antd/es/modal/Modal'
import Form from 'antd/es/form'
import Input from 'antd/es/input'
import { Link } from 'react-router-dom'
import React from 'react'
import Title from 'antd/es/typography/Title'

import s from './signup.module.scss'

export const SignupPage = () => {
  return (
    <div className={s.wrapper}>
      <Modal title={<Title className={s.title}>Регистрация</Title>} open closable={false} centered>
        <Form layout='vertical'>
          <Form.Item name='login' label='Ваше имя' rules={[{ required: true }]}>
            <Input className={s.input} />
          </Form.Item>
          <Form.Item name='email' label='Email' rules={[{ required: true }]}>
            <Input className={s.input} />
          </Form.Item>
          <Form.Item name='password' label='Пароль' rules={[{ required: true }]}>
            <Input.Password className={s.input} />
          </Form.Item>
          <Form.Item name='repeatedPassword' label='Повторите пароль' rules={[{ required: true }]}>
            <Input.Password className={s.input} />
          </Form.Item>
          <span>Если у вас уже есть учетная запись, то</span> <Link to='/login'>войдите</Link>
        </Form>
      </Modal>
    </div>
  )
}
