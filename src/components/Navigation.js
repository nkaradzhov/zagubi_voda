import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import HoverDropdown from '../components/HoverDropdown'
import SaveState from './history/Save'
import { pageTitles } from '../util/constants'

const Navigation = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/home">Watersave</Link>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <LinkContainer to="/manual" exact>
        <NavItem>{pageTitles.manual}</NavItem>
      </LinkContainer>
      <HoverDropdown
        title="Модул 1 - Параметри на загуби на вода"
        id="module1-dropdown"
      >
        <LinkContainer to="/page1" exact>
          <NavItem>{pageTitles.page1}</NavItem>
        </LinkContainer>
        <LinkContainer to="/page2" exact>
          <NavItem>{pageTitles.page2}</NavItem>
        </LinkContainer>
      </HoverDropdown>
      <HoverDropdown title="Модул 2 - Редуктори" id="module2-dropdown">
        <LinkContainer to="/page3" exact>
          <NavItem>{pageTitles.page3}</NavItem>
        </LinkContainer>
        <LinkContainer to="/page4" exact>
          <NavItem>{pageTitles.page4}</NavItem>
        </LinkContainer>
        <LinkContainer to="/page5" exact>
          <NavItem>{pageTitles.page5}</NavItem>
        </LinkContainer>
      </HoverDropdown>
      <HoverDropdown
        title="Модул 3 - Нето сегашна вредност"
        id="module3-dropdown"
      >
        <LinkContainer to="/page7" exact>
          <NavItem>{pageTitles.page7}</NavItem>
        </LinkContainer>
        <LinkContainer to="/page8" exact>
          <NavItem>{pageTitles.page8}</NavItem>
        </LinkContainer>
      </HoverDropdown>
      <LinkContainer to="/history" exact>
        <NavItem>{pageTitles.history}</NavItem>
      </LinkContainer>
      <LinkContainer to="/references" exact>
        <NavItem>{pageTitles.references}</NavItem>
      </LinkContainer>
    </Nav>
    <Navbar.Form pullRight>
      <SaveState />
    </Navbar.Form>
  </Navbar>
)

export default Navigation
