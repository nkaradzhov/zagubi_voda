import React from 'react'
import styled from 'styled-components'
import { OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const OnHover = ({ id, text, children }) => (
  <OverlayTrigger
    overlay={<Tooltip id={id}>{text}</Tooltip>}
    placement="bottom"
    delayShow={450}
    delayHide={150}
  >
    {children}
  </OverlayTrigger>
)

const PrevNext = ({ prev, next, children }) => (
  <Container>
    {prev && (
      <OnHover id="prev" text={prev.tooltip}>
        <Link
          to={prev.to}
          style={{
            transform: 'translateX(-150%)',
            position: 'absolute',
            left: 0
          }}
          className="btn btn-default"
        >
          <Glyphicon glyph="menu-left" />
        </Link>
      </OnHover>
    )}
    {children}
    {next && (
      <OnHover id="next" text={next.tooltip}>
        <Link
          to={next.to}
          style={{
            transform: 'translateX(150%)',
            position: 'absolute',
            right: 0
          }}
          className="btn btn-default"
        >
          <Glyphicon glyph="menu-right" />
        </Link>
      </OnHover>
    )}
  </Container>
)

export default PrevNext

const Container = styled.div`
  display: flex;
  position: relative;
  align-items: center;
`
