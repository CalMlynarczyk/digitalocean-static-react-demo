import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import Login from "./Login";
import "./App.css";

function App() {
  const [message, setMessage] = useState(0);
  const [user, setUser] = useState(null);
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    fetch("http://localhost:5000")
      .then((response) => response.text())
      .then((data) => {
        setMessage(data);
      });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then((token) =>
        fetch("http://localhost:5000/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.text())
          .then((data) => {
            setUser(data);
          }),
      );
    }
  }, [isAuthenticated]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>{message}</p>
        <Login />
        {user ? <p>{user}</p> : null}
      </header>
    </div>
  );
}

export default App;
