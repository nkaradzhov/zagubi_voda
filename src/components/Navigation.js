import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Navigation = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">Logo</Link>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <LinkContainer to="/page1" exact>
        <NavItem eventKey={1}>Page1</NavItem>
      </LinkContainer>
      <LinkContainer to="/about">
        <NavItem eventKey={2}>About</NavItem>
      </LinkContainer>
      <LinkContainer to="/topics">
        <NavItem eventKey={3}>Topics</NavItem>
      </LinkContainer>
    </Nav>
  </Navbar>
)

export default Navigation
