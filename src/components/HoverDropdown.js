import React from 'react'
import { State } from 'react-powerplug'
import { NavDropdown } from 'react-bootstrap'

const HoverDropdown = ({ children, ...rest }) => (
  <State initial={{ open: false }}>
    {({ state, setState }) => (
      <NavDropdown
        {...rest}
        open={state.open}
        onMouseEnter={() => setState({ open: true })}
        onMouseLeave={() => setState({ open: false })}
        onToggle={() => setState({ open: !state.open })}
      >
        {children}
      </NavDropdown>
    )}
  </State>
)

export default HoverDropdown
