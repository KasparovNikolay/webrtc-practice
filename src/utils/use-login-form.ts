import { useState } from 'react'
import { OnInputChangeEvent } from './types'

export const useLoginForm = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [errors, setErrors] = useState({})

  const handleChangeLogin = (event: OnInputChangeEvent) => setLogin(event.target.value)
  const handleChangePassword = (event: OnInputChangeEvent) => setPassword(event.target.value)

  const submitForm = () => {
    setIsSending(true)
    const data = { login, password }
    // validate
    // set errors
    // send to backend
    setIsSending(false)
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
