import {FC, ReactNode} from 'react';
import {useNavigate} from "react-router-dom";
import {Auth0Provider as Auth0ProviderLib} from "@auth0/auth0-react";
import {constants} from "../../utils";

type Auth0Provider = { children: ReactNode | ReactNode[] };

export const Auth0Provider: FC<Auth0Provider> = ({children}) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState: any) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };

  return (
    <Auth0ProviderLib
      domain={constants.DOMAIN}
      clientId={constants.CLIENT_ID}
      authorizationParams={{
        redirect_uri: constants.LOGOUT_LINK,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0ProviderLib>
  );
};
