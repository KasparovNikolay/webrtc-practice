import { Link } from 'react-router-dom'

import Modal from 'antd/es/modal/Modal'
import Input from 'antd/es/input'
import Form from 'antd/es/form'
import Title from 'antd/es/typography/Title'
import Button from 'antd/es/button'

import s from './signup.module.css'
import { useLoginForm } from '../utils/use-login-form'

export const LoginPage = () => {
  const {
    errors,
    submitForm,
    handleChangeLogin,
    handleChangePassword,
    isSending,
    password,
    login,
  } = useLoginForm()

  return (
    <div className={s.wrapper}>
      <Modal
        title={<Title className={s.title}>Вход</Title>}
        open
        closable={false}
        centered
        footer={null}
      >
        <Form layout='vertical'>
          <Form.Item name='login' label='Email' rules={[{ required: true }]}>
            <Input value={login} onChange={handleChangeLogin} />
          </Form.Item>
          <Form.Item name='password' label='Пароль' rules={[{ required: true }]}>
            <Input.Password value={password} onChange={handleChangePassword} />
          </Form.Item>
          <span>Если у вас нет учетной записи, то</span> <Link to='/signup'>зарегистрируйтесь</Link>
          <div className={s.footer}>
            <Button loading={isSending} onClick={submitForm} type='primary'>
              Войти
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  )
}
