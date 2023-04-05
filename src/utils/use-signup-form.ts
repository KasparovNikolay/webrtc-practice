import { useState } from 'react'
import { OnInputChangeEvent } from './types'
import { $axios } from './axios'
import { useNavigate } from 'react-router-dom'

export const useSignupForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatedPassword, setRepeatedPassword] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()

  const handleChangeLogin = (event: OnInputChangeEvent) => setEmail(event.target.value)
  const handleChangePassword = (event: OnInputChangeEvent) => setPassword(event.target.value)
  const handleChangeRepeatedPassword = (event: OnInputChangeEvent) =>
    setRepeatedPassword(event.target.value)
  const handleChangeName = (event: OnInputChangeEvent) => setName(event.target.value)

  const submitForm = () => {
    setIsSending(true)
    const data = { email, password }
    // validate
    // set errors
    $axios
      .post('/signup', data)
      .then(({ data }) => {
        if (data.user.id) navigate('/')
      })
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
    handleChangeLogin,
    handleChangePassword,
    handleChangeRepeatedPassword,
    isSending,
    password,
    email,
    repeatedPassword,
    name,
  }
}
