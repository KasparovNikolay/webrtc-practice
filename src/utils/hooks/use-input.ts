import { OnInputChangeEvent } from '../types'
import { useState } from 'react'

export const useInput = (): [string, (event: OnInputChangeEvent) => void] => {
  const [state, setState] = useState<string>('')
  const handleChange = (event: OnInputChangeEvent) => setState(event.target.value)

  return [state, handleChange]
}
