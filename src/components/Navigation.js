import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import HoverDropdown from '../components/HoverDropdown'
import SaveState from './history/Save'

const Navigation = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/page1">Watersave</Link>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <LinkContainer to="/manual" exact>
        <NavItem>Корисничко упатство</NavItem>
      </LinkContainer>
      <HoverDropdown title="Модул 1" id="module1-dropdown">
        <LinkContainer to="/page1" exact>
          <NavItem>Мерени податоци</NavItem>
        </LinkContainer>
        <LinkContainer to="/page2" exact>
          <NavItem>Анализа на загуби на вода</NavItem>
        </LinkContainer>
      </HoverDropdown>
      <HoverDropdown title="Модул 2" id="module2-dropdown">
        <LinkContainer to="/page3" exact>
          <NavItem>Редуктор со фиксен излез</NavItem>
        </LinkContainer>
        <LinkContainer to="/page4" exact>
          <NavItem>Редуктор модулиран на база на временски интервали</NavItem>
        </LinkContainer>
        <LinkContainer to="/page5" exact>
          <NavItem>Сценарио 3</NavItem>
        </LinkContainer>
      </HoverDropdown>
      <HoverDropdown title="Модул 3" id="module3-dropdown">
        <LinkContainer to="/page6" exact>
          <NavItem>Потенцијален нето бенефит</NavItem>
        </LinkContainer>
        <LinkContainer to="/page7" exact>
          <NavItem>Заштеди со редукција на притисокот</NavItem>
        </LinkContainer>
      </HoverDropdown>
      <LinkContainer to="/history" exact>
        <NavItem>Историја</NavItem>
      </LinkContainer>
      <LinkContainer to="/references" exact>
        <NavItem>Референци</NavItem>
      </LinkContainer>
    </Nav>
    <Navbar.Form pullRight>
      <SaveState />
    </Navbar.Form>
  </Navbar>
)

export default Navigation
