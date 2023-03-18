import { FC } from 'react'

import { useAuth0 } from '@auth0/auth0-react'

export const LoginButton: FC = (props) => {
  const { loginWithRedirect } = useAuth0()
  const handleLogin = () => loginWithRedirect()
  return <button onClick={handleLogin}>Log In</button>
}
