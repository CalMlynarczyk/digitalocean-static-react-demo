import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Login from "./Login";

const NavBar = () => (
  <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="/">My App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
      <Nav variant="pills" defaultActiveKey="/">
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Login />
        </Nav.Item>
      </Nav>
    </Container>
  </Navbar>
);

export default NavBar;
