import React, { Component } from 'react'
import { Button, Glyphicon, ListGroup, ListGroupItem } from 'react-bootstrap'
import { getAll, del } from '../util/HistoryService'
import styled from 'styled-components'
import moment from 'moment'
import { connect } from 'react-redux'

const ListItem = ({ item, onLoad, onDelete }) => (
  <ListGroupItem key={item.time}>
    {item.name}
    {moment(item.time).fromNow()}
    <Button bsStyle="primary" onClick={() => onLoad(item)}>
      Load
    </Button>
    <Button bsStyle="danger" onClick={() => onDelete(item)}>
      <Glyphicon glyph="trash" />
    </Button>
  </ListGroupItem>
)

class History extends Component {
  state = {
    history: []
  }

  refresh = () => {
    console.log('refresh...')
    this.setState({ history: getAll() })
  }

  componentDidMount() {
    this.refresh()
    window.addEventListener('localstorage', this.refresh, false)
  }

  componentWillUnmount() {
    window.removeEventListener('localstorage', this.refresh)
  }

  load = item => this.props.loadState(item.payload)
  del = item => {
    console.log('deleting', item.time)
    del(item.time)
  }

  render = () => (
    <Container>
      <ListGroup style={{ width: '50vw', height: '50vh', overflow: 'scroll' }}>
        {this.state.history.map(item => (
          <ListItem
            key={item.time}
            item={item}
            onLoad={this.load}
            onDelete={this.del}
          />
        ))}
      </ListGroup>
    </Container>
  )
}

const Container = styled.div`
  height: 100%
  display: flex
  align-items: center
  justify-content: center
`

const mdtp = dispatch => ({
  loadState: payload =>
    dispatch({
      type: 'LOAD_PERSISTED_STATE',
      payload
    })
})

export default connect(
  null,
  mdtp
)(History)
