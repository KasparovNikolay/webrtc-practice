import { FC } from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'

export const ProtectedRoute: FC<any> = ({ component, ...args }) => {
  const Component = withAuthenticationRequired(component, args)

  return <Component />
}
