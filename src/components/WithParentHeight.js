import React from 'react'
export default class NumberInput extends React.Component {
  div = React.createRef()
  state = {
    height: 0
  }

  componentDidMount = () => {
    const { height } = this.div.current.parentNode.getBoundingClientRect()
    this.setState({
      height
    })
  }

  render = () => (
    <div ref={this.div}>{this.props.children(this.state.height)}</div>
  )
}
