import React, { Component } from 'react'
import { Table, Grid, Row, Col, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux'

import {
  updateVlezen,
  updateSreden,
  updateKritichen,
  updateProtok,
  getMinProtok
} from './reducers/page1'

const Tr = ({
  obj,
  onVlezenChange,
  onSredenChange,
  onKritichenChange,
  onProtokChange
}) => (
  <tr>
    <td>{obj.hour}</td>
    <td>
      <FormControl
        value={obj.vlezen}
        bsSize="sm"
        type="text"
        onChange={e => onVlezenChange(e.target.value)}
      />
    </td>
    <td>
      <FormControl
        value={obj.sreden}
        bsSize="sm"
        type="text"
        onChange={e => onSredenChange(e.target.value)}
      />
    </td>
    <td>
      <FormControl
        value={obj.kritichen}
        bsSize="sm"
        type="text"
        onChange={e => onKritichenChange(e.target.value)}
      />
    </td>
    <td>
      <FormControl
        value={obj.protok}
        bsSize="sm"
        type="text"
        onChange={e => onProtokChange(e.target.value)}
      />
    </td>
  </tr>
)

class Page1 extends Component {
  render() {
    const { data, setVlezen, setSreden, setKritichen, setProtok } = this.props

    return (
      <Grid>
        <Row className="show-grid">
          <Col lg={8} sm={10}>
            {/* <Table striped bordered condensed hover bsSize="sm"> */}
            <table className="table table-sm">
              <thead>
                <tr>
                  <th>Час</th>
                  <th>Влезен притисок (m)</th>
                  <th>Среден притисок (m)</th>
                  <th>Критичен притисок (m)</th>
                  <th>Влезен проток (m3/h)</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(data).map(key => (
                  <Tr
                    obj={data[key]}
                    key={key}
                    onVlezenChange={setVlezen(key)}
                    onSredenChange={setSreden(key)}
                    onKritichenChange={setKritichen(key)}
                    onProtokChange={setProtok(key)}
                  />
                ))}
                <tr>
                  <td colSpan="4">Minimalnata nokna potroshuvachka</td>
                  <td>{this.props.minProtok}</td>
                </tr>
              </tbody>
            </table>
            {/* </Table> */}
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mstp = state => ({
  data: state.page1,
  minProtok: getMinProtok(state)
})

const mdtp = dispatch => ({
  setVlezen: key => val => dispatch(updateVlezen(key, val)),
  setSreden: key => val => dispatch(updateSreden(key, val)),
  setKritichen: key => val => dispatch(updateKritichen(key, val)),
  setProtok: key => val => dispatch(updateProtok(key, val))
})

export default connect(mstp, mdtp)(Page1)
