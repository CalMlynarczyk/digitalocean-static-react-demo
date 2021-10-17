import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [message, setMessage] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    fetch("http://localhost:5000")
      .then((response) => response.text())
      .then((data) => {
        setMessage(data);
      });
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>{message}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {loggedIn ? <h3>Logged In</h3> : null}
        <button
          type="button"
          onClick={() => {
            fetch("http://localhost:5000/auth/login", {
              method: "POST",
              body: { username: "john", password: "changeme" },
            })
              .then((response) => response.text())
              .then((data) => {
                setLoggedIn(true);
              });
          }}
        >
          Log In
        </button>
      </header>
    </div>
  );
}

export default App;
