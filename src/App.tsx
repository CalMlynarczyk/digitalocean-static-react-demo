import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import logo from "./logo.svg";
import Loading from "./Loading";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import "./App.css";

function App() {
  const [message, setMessage] = useState("0");
  const [user, setUser] = useState<string | null>(null);
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();

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
  }, [getAccessTokenSilently, isAuthenticated]);

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <Router>
        <div className="App">
          <Login />
          <nav>
            <ul>
              <li>
                <NavLink to="/" activeClassName="nav-link--active">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" activeClassName="nav-link--active">
                  About
                </NavLink>
              </li>
            </ul>
          </nav>
          <Switch>
            <ProtectedRoute
              path="/about"
              component={() => (
                <div>Welcome to our site! {user ? <p>{user}</p> : null}</div>
              )}
            />
            <Route path="/">
              <p>{message}</p>
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
              </header>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
