import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SaveState from './history/Save'

const Navigation = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/page1">Logo</Link>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <LinkContainer to="/page1" exact>
        <NavItem>Мерени податоци</NavItem>
      </LinkContainer>
      <LinkContainer to="/page2" exact>
        <NavItem>Анализа на загуби на вода</NavItem>
      </LinkContainer>
      <LinkContainer to="/page3" exact>
        <NavItem>Редуктор со фиксен излез</NavItem>
      </LinkContainer>
      <LinkContainer to="/history" exact>
        <NavItem>History</NavItem>
      </LinkContainer>
    </Nav>
    <Navbar.Form pullRight>
      <SaveState />
    </Navbar.Form>
  </Navbar>
)

export default Navigation
