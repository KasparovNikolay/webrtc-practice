import {useAuth0} from "@auth0/auth0-react";
import {LoginButton} from "../LoginButton/LogginButton";
import {LogoutButton} from "../LogoutButton/LogoutButton";

export const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const nonAuth = !user || !isAuthenticated;

  return  (
    <div>
      {nonAuth && <div>user is not defined</div>}
      {nonAuth ? <LoginButton/> : <LogoutButton/>}
      {isLoading && <div>Loading ...</div>}

      {user && (
        <>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </>
      )}
    </div>
  );
};
