const useUser = () => {
  return {
    user: {
      picture: '',
      name: '',
      email: '',
    },
    isAuthenticated: false,
    isLoading: true,
  }
}

export const Profile = () => {
  const { user, isAuthenticated, isLoading } = useUser()
  const nonAuth = !user || !isAuthenticated

  return (
    <div>
      {nonAuth && <div>user is not defined</div>}

      {/* login or logout */}
      {nonAuth ? <div /> : <div />}

      {isLoading && <div>Loading ...</div>}

      {user && (
        <>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </>
      )}
    </div>
  )
}
