import React from 'react';
import {useAuth0} from "@auth0/auth0-react";
import {constants} from "../../utils";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ logoutParams: { returnTo: constants.LOGOUT_LINK } })}>
      Log Out
    </button>
  );
};
