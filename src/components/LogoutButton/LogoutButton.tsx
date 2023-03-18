import {useAuth0} from "@auth0/auth0-react";
import {constants} from "../../utils";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: constants.LOGOUT_LINK } });
  }

  return (
    <button onClick={handleLogout}>
      Log Out
    </button>
  );
};
