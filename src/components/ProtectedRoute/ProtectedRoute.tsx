import { FC, FunctionComponent } from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'

type ProtectedRoutePropsType = { component: FunctionComponent } & { [key: string]: unknown }

export const ProtectedRoute: FC<ProtectedRoutePropsType> = ({ component, ...args }) => {
  const Component = withAuthenticationRequired(component, args)

  return <Component />
}
