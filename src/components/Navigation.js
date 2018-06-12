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
        <NavItem>Page1</NavItem>
      </LinkContainer>
      <LinkContainer to="/page2" exact>
        <NavItem>Page2</NavItem>
      </LinkContainer>
      <LinkContainer to="/page3" exact>
        <NavItem>Page3</NavItem>
      </LinkContainer>
      <LinkContainer to="/about">
        <NavItem>About</NavItem>
      </LinkContainer>
      <LinkContainer to="/topics">
        <NavItem>Topics</NavItem>
      </LinkContainer>
    </Nav>
  </Navbar>
)

export default Navigation
