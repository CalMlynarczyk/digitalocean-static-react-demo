import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();

  return (
    <div>
      <h2>Auth0</h2>
      <button onClick={() => loginWithRedirect()}>Log In</button>
      <button onClick={() => logout({ returnTo: window.location.origin })}>
        Log Out
      </button>
      {isLoading ? <p>Loading ...</p> : null}
      {isAuthenticated ? (
        <p>
          Logged in as <strong>{user.email}</strong>
        </p>
      ) : null}
    </div>
  );
};

export default Login;
