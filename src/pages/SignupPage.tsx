import { Link } from 'react-router-dom'

import Modal from 'antd/es/modal/Modal'
import Form from 'antd/es/form'
import Input from 'antd/es/input'
import Title from 'antd/es/typography/Title'
import Button from 'antd/es/button'

import { useSignupForm } from '../utils/hooks/use-signup-form'

import s from './signup.module.css'

export const SignupPage = () => {
  const {
    errors,
    submitForm,
    handleChangeName,
    handleChangeEmail,
    handleChangePassword,
    handleChangeRepeatedPassword,
    isSending,
    password,
    email,
    repeatedPassword,
    name,
  } = useSignupForm()

  return (
    <div className={s.wrapper}>
      <Modal
        title={<Title className={s.title}>Регистрация</Title>}
        open
        closable={false}
        centered
        footer={null}
      >
        <Form layout='vertical'>
          <Form.Item name='name' label='Ваше имя' rules={[{ required: true }]}>
            <Input value={name} onChange={handleChangeName} className={s.input} />
          </Form.Item>
          <Form.Item name='email' label='Email' rules={[{ required: true }]}>
            <Input value={email} onChange={handleChangeEmail} className={s.input} />
          </Form.Item>
          <Form.Item name='password' label='Пароль' rules={[{ required: true }]}>
            <Input.Password value={password} onChange={handleChangePassword} className={s.input} />
          </Form.Item>
          <Form.Item name='repeatedPassword' label='Повторите пароль' rules={[{ required: true }]}>
            <Input.Password
              value={repeatedPassword}
              onChange={handleChangeRepeatedPassword}
              className={s.input}
            />
          </Form.Item>
          <span>Если у вас уже есть учетная запись, то</span> <Link to='/login'>войдите</Link>
          <Button loading={isSending} onClick={submitForm} type='primary'>
            Зарегистрироваться
          </Button>
        </Form>
      </Modal>
    </div>
  )
}
