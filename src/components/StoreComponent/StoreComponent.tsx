import { createContext, FC, ReactNode } from 'react'
import { Store } from '../../utils/Store'

const user = new Store()

const state = {
  user,
}

export const StoreContext = createContext(state)

export const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <StoreContext.Provider value={state}>{children}</StoreContext.Provider>
}
