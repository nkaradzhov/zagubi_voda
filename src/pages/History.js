import React, { Component } from 'react'
import { getAll, del } from '../util/HistoryService'
import { connect } from 'react-redux'
import HistoryItem from '../components/history/HistoryItem'
import styled from 'styled-components'

class History extends Component {
  state = {
    history: []
  }

  getHistory = () => this.setState({ history: getAll() })

  componentDidMount() {
    this.getHistory()
    window.addEventListener('localstorage', this.getHistory, false)
  }

  componentWillUnmount() {
    window.removeEventListener('localstorage', this.getHistory)
  }

  load = item => {
    this.props.loadState(item.payload)
    this.props.history.push('/page1')
  }
  del = item => del(item.time)

  render = () =>
    this.state.history.length ? (
      <List>
        {this.state.history.map(item => (
          <HistoryItem
            key={item.time}
            item={item}
            onLoad={this.load}
            onDelete={this.del}
          />
        ))}
      </List>
    ) : (
      <Empty />
    )
}

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

const Empty = () => (
  <Container>
    <h2>No history.</h2>
  </Container>
)

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const List = styled.ul`
  width: 50vw;
  margin: 0 auto;
  list-style: none;
  padding: 0;
`
