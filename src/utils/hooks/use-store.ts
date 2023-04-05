import { useContext } from 'react'
import { StoreContext } from '../../components/StoreComponent/StoreComponent'

export const useStore = () => {
  return useContext(StoreContext)
}
