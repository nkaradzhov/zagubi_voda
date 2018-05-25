import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'

import {
  updateVlezen,
  updateSreden,
  updateKritichen,
  updateProtok,
  getMinProtok
} from '../reducers/page1'

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
      <input
        type="text"
        value={obj.vlezen}
        onChange={e => onVlezenChange(e.target.value)}
      />
    </td>
    <td>
      <input
        value={obj.sreden}
        type="text"
        onChange={e => onSredenChange(e.target.value)}
      />
    </td>
    <td>
      <input
        value={obj.kritichen}
        type="text"
        onChange={e => onKritichenChange(e.target.value)}
      />
    </td>
    <td>
      <input
        value={obj.protok}
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
            <table>
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
