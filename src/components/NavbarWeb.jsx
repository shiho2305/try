import React from "react";
import "./style.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Outlet, NavLink, Link } from "react-router-dom";

const NavbarWeb = () => {
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link>
              <NavLink to="/users" id="navbar-item">
                Users
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to="/photos" id="navbar-item">
                Photos
              </NavLink>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Outlet />
    </div>
  );
};

export default NavbarWeb;
