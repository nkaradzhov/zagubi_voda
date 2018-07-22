import React, { Fragment } from 'react'
import moment from 'moment'
import { Button, Glyphicon } from 'react-bootstrap'
import { BooleanValue } from 'react-values'
import styled from 'styled-components'

const HistoryItem = ({ item, onLoad, onDelete }) => (
  <BooleanValue defaultValue={false}>
    {({ value: hover, toggle }) => (
      <Item key={item.time} onMouseEnter={toggle} onMouseLeave={toggle}>
        <Time>{moment(item.time).fromNow()}</Time>
        <Title>{item.name}</Title>
        <ButtonContainer clasName="bc">
          {/* {hover && ( */}
          <Fragment>
            <Button
              style={{ marginRight: '1em' }}
              bsSize="xsmall"
              bsStyle="primary"
              onClick={() => onLoad(item)}
            >
              <Glyphicon glyph="ok" />
            </Button>
            <Button
              bsSize="xsmall"
              bsStyle="danger"
              onClick={() => onDelete(item)}
            >
              <Glyphicon glyph="remove" />
            </Button>
          </Fragment>
          {/* )} */}
        </ButtonContainer>
      </Item>
    )}
  </BooleanValue>
)

export default HistoryItem

const ButtonContainer = styled.div`
  visibility: hidden;
  display: flex;
  flex: 1;
  justify-content: flex-end;
`
const Item = styled.li`
  display: flex;
  justify-content: space-between;
  border-bottom: 0.1px solid lightgrey;
  height: 50px;
  align-items: center;
  padding: 0 1em;
  &:hover {
    & > div {
      visibility: visible;
    }
    background: lightgoldenrodyellow;
  }
`
const Time = styled.small`
  display: flex;
  flex: 1;
  justify-content: flex-start;
`

const Title = styled.h3`
  display: flex;
  flex: 3;
  justify-content: center;
`
