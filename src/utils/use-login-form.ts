import { useState } from 'react'
import { OnInputChangeEvent } from './types'
import { $axios } from './axios'
import { useNavigate } from 'react-router-dom'

export const useLoginForm = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()

  const handleChangeLogin = (event: OnInputChangeEvent) => setLogin(event.target.value)
  const handleChangePassword = (event: OnInputChangeEvent) => setPassword(event.target.value)

  const submitForm = () => {
    setIsSending(true)
    const data = { login, password }
    // TODO: validate
    $axios
      .post('/login', data)
      .then(({ data }) => {
        if (data.user.id) navigate('/')
      })
      .catch((e) => {
        setErrors({ all: e.message })
        console.log(e)
      })
      .finally(() => setIsSending(false))
  }

  return {
    errors,
    submitForm,
    handleChangeLogin,
    handleChangePassword,
    isSending,
    password,
    login,
  }
}
