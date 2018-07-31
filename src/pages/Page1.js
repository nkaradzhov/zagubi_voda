import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import NumberInput from '../components/NumberInput'
import Highlight from '../components/Highlight'
import PrevNext from '../components/PrevNext'
import Page from '../components/Page'
import { connect } from 'react-redux'

import {
  updateVlezen,
  updateSreden,
  updateKritichen,
  updateProtok,
  selectors
} from '../reducers/page1'
import { pageTitles } from '../util/constants'

const Tr = ({
  obj,
  onVlezenChange,
  onSredenChange,
  onKritichenChange,
  onProtokChange,
  ...rest
}) => (
  <tr {...rest}>
    <td>{obj.hour}</td>
    <td>
      <NumberInput type="text" value={obj.vlezen} onChange={onVlezenChange} />
    </td>
    <td>
      <NumberInput value={obj.sreden} type="text" onChange={onSredenChange} />
    </td>
    <td>
      <NumberInput
        value={obj.kritichen}
        type="text"
        onChange={onKritichenChange}
      />
    </td>
    <td>
      <NumberInput value={obj.protok} type="text" onChange={onProtokChange} />
    </td>
  </tr>
)

const next = { to: '/page2', tooltip: pageTitles.page2 }

const Page1 = ({
  data,
  minRowHour,
  minProtok,
  minSreden,
  setVlezen,
  setSreden,
  setKritichen,
  setProtok
}) => (
  <Page title={pageTitles.page1}>
    <Grid>
      <Row className="show-grid">
        <Col lg={8} sm={10} lgOffset={2} smOffset={1}>
          <PrevNext next={next}>
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
                  <Highlight>
                    <td className="eho eee">{minProtok}</td>
                  </Highlight>
                </tr>
                <tr>
                  <td colSpan="4">
                    Средна вредност на ноќниот притисок во мрежата
                  </td>
                  <Highlight>
                    <td>{minSreden}</td>
                  </Highlight>
                </tr>
              </tbody>
            </table>
          </PrevNext>
        </Col>
      </Row>
    </Grid>
  </Page>
)

const mstp = state => ({
  data: state.page1,
  minRowHour: selectors.minRowHourSelector(state),
  minProtok: selectors.minProtokSelector(state),
  minSreden: selectors.minSredenSelector(state)
})

const mdtp = dispatch => ({
  setVlezen: key => val => dispatch(updateVlezen(key, val)),
  setSreden: key => val => dispatch(updateSreden(key, val)),
  setKritichen: key => val => dispatch(updateKritichen(key, val)),
  setProtok: key => val => dispatch(updateProtok(key, val))
})

export default connect(
  mstp,
  mdtp
)(Page1)
