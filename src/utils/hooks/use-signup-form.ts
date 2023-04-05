import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from './use-store'
import { useInput } from './use-input'

export const useSignupForm = () => {
  // inputs
  const [name, handleChangeName] = useInput()
  const [email, handleChangeEmail] = useInput()
  const [password, handleChangePassword] = useInput()
  const [repeatedPassword, handleChangeRepeatedPassword] = useInput()
  // statuses
  const [isSending, setIsSending] = useState(false)
  const [errors, setErrors] = useState({})

  const { user } = useStore()

  const navigate = useNavigate()

  const submitForm = () => {
    setIsSending(true)
    // TODO: validate
    // TODO: set errors

    user
      .registration(email, password)
      .then(() => navigate('/'))
      .catch((e) => {
        setErrors({ all: e.message })
        console.warn(e)
      })
      .finally(() => setIsSending(false))
  }

  return {
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
  }
}
