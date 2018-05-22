import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

const Navigation = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">Logo</Link>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem>
        <Link to="/">Home</Link>
      </NavItem>
      <NavItem>
        <Link to="/about">About</Link>
      </NavItem>
      <NavItem>
        <Link to="/topics">Topics</Link>
      </NavItem>
    </Nav>
  </Navbar>
)

export default Navigation
