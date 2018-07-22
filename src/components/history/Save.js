import React, { Component, Fragment } from 'react'
import { Button, Modal, FormControl } from 'react-bootstrap'
import { save } from '../../util/HistoryService'
import { connect } from 'react-redux'

const initialState = {
  modal: false,
  name: ''
}

class Save extends Component {
  state = initialState

  handleNameChange = e => this.setState({ name: e.target.value })

  showModal = () => this.setState({ modal: true })
  reset = () => this.setState(initialState)

  isSaveEnabled = () => this.state.name.length

  save = () => {
    save(this.props.storeState, this.state.name)
    this.reset()
  }

  renderModal = () => (
    <div className="static-modal">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>Save</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={() => this.isSaveEnabled() && this.save()}>
            <FormControl
              type="text"
              value={this.state.name}
              placeholder="name"
              onChange={this.handleNameChange}
            />
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.reset}>Cancel</Button>
          <Button
            disabled={!this.isSaveEnabled()}
            onClick={this.save}
            bsStyle="primary"
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  )

  render = () => (
    <Fragment>
      {this.state.modal && this.renderModal()}
      <Button onClick={this.showModal}>Save</Button>
    </Fragment>
  )
}

const mstp = storeState => ({ storeState })
export default connect(mstp)(Save)
