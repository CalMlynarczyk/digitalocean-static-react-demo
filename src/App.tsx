import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loading from "./Loading";
import Nav from "./Nav";
import ProtectedRoute from "./ProtectedRoute";
import "./App.scss";

function App() {
  const [message, setMessage] = useState("0");
  const [user, setUser] = useState<string | null>(null);
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ROOT}`)
      .then((response) => response.text())
      .then((data) => {
        setMessage(data);
      });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then((token) =>
        fetch(`${process.env.REACT_APP_API_ROOT}/user`, {
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
          <Nav />
          <Container>
            <Row>
              <Col>
                <Switch>
                  <Route path="/">
                    <p>{message}</p>
                  </Route>
                  <ProtectedRoute
                    path="/about"
                    component={() => (
                      <div>
                        Welcome to our site! {user ? <p>{user}</p> : null}
                      </div>
                    )}
                  />
                </Switch>
              </Col>
            </Row>
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
