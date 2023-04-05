import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { OnInputChangeEvent } from '../types'
import { useStore } from './use-store'

export const useLoginForm = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [errors, setErrors] = useState({})

  const { user } = useStore()

  const navigate = useNavigate()

  const handleChangeLogin = (event: OnInputChangeEvent) => setLogin(event.target.value)
  const handleChangePassword = (event: OnInputChangeEvent) => setPassword(event.target.value)

  const submitForm = () => {
    setIsSending(true)
    // TODO: validate
    user
      .login(login, password)
      .then(() => navigate('/'))
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
