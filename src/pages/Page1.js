import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import NumberInput from '../components/NumberInput'
import { connect } from 'react-redux'

import {
  updateVlezen,
  updateSreden,
  updateKritichen,
  updateProtok,
  getMinRow
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
      <NumberInput
        type="text"
        value={obj.vlezen}
        onChange={val => onVlezenChange(val)}
      />
    </td>
    <td>
      <NumberInput
        value={obj.sreden}
        type="text"
        onChange={val => onSredenChange(val)}
      />
    </td>
    <td>
      <NumberInput
        value={obj.kritichen}
        type="text"
        onChange={val => onKritichenChange(val)}
      />
    </td>
    <td>
      <NumberInput
        value={obj.protok}
        type="text"
        onChange={val => onProtokChange(val)}
      />
    </td>
  </tr>
)

const Page1 = ({
  data,
  minRow,
  setVlezen,
  setSreden,
  setKritichen,
  setProtok
}) => (
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
              <td colSpan="4">
                Минималната ноќна потрошувачка (измерена), m3/h
              </td>
              <td>{minRow ? minRow.protok : 'n/a'}</td>
            </tr>
            <tr>
              <td colSpan="4">
                Средна вредност на ноќниот притисок во мрежата
              </td>
              <td>{minRow ? minRow.sreden : 'n/a'}</td>
            </tr>
          </tbody>
        </table>
      </Col>
    </Row>
  </Grid>
)

const mstp = state => ({
  data: state.page1,
  minRow: getMinRow(state)
})

const mdtp = dispatch => ({
  setVlezen: key => val => dispatch(updateVlezen(key, val)),
  setSreden: key => val => dispatch(updateSreden(key, val)),
  setKritichen: key => val => dispatch(updateKritichen(key, val)),
  setProtok: key => val => dispatch(updateProtok(key, val))
})

export default connect(mstp, mdtp)(Page1)
