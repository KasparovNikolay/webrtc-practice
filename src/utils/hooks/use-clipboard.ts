import { useCallback } from 'react'

export const useClipBoard = (callback?: () => void) => {
  const set = useCallback((val: string) => {
    navigator.clipboard.writeText(val).then(() => callback?.())
  }, [])

  return { value: navigator.clipboard.readText(), setValue: set }
}
