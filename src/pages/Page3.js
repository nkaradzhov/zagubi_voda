import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { selectors, updateAction } from '../reducers/page3'
import NumberInput from '../components/NumberInput'
import round from '../util/round'

const Page3 = ({
  data,
  redukcijaNaVlezenPritisok,
  zashtedaVodaM3,
  zashtedaVodaPercent,
  change
}) => (
  <Grid>
    <Row className="show-grid">
      <Col lg={8} sm={10} lgOffset={2} smOffset={1}>
        <table>
          <tbody>
            <tr>
              <td colSpan={4}>Редукција на влезниот притисок</td>
              <td>
                <NumberInput
                  value={redukcijaNaVlezenPritisok}
                  onChange={change}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </Col>
    </Row>
    <Row className="show-grid">
      <Col lg={8} sm={10} lgOffset={2} smOffset={1}>
        <table>
          <thead>
            <tr>
              <th>Час</th>
              <th>Редуциран влезен притисок</th>
              <th>Дефиниран среден притисок</th>
              <th>Нов пресметан критичен притисок</th>
            </tr>
          </thead>
          <tbody>
            {data.map((val, i) => (
              <tr key={i}>
                <td colSpan={1}>{val.hour}</td>
                <td colSpan={1}>{round(val.reduciranVlezenPritisok)}</td>
                <td colSpan={1}>{round(val.novSredenPritisok)}</td>
                <td colSpan={1}>{round(val.novKritichenPritisok)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Col>
    </Row>
    <Row className="show-grid">
      <Col lg={8} sm={10} lgOffset={2} smOffset={1}>
        <table>
          <tbody>
            <tr>
              <td>Заштеда на вода ( m3/ден )</td>
              <td>{zashtedaVodaM3}</td>
            </tr>
            <tr>
              <td>Заштеда на вода ( % )</td>
              <td>{zashtedaVodaPercent}</td>
            </tr>
          </tbody>
        </table>
      </Col>
    </Row>
  </Grid>
)

const mstp = state => ({
  data: selectors.page3DataSelector(state),
  redukcijaNaVlezenPritisok: selectors.redukcijaNaVlezenPritisokSelector(state),
  zashtedaVodaM3: selectors.zashtedaVodaM3Selector(state),
  zashtedaVodaPercent: selectors.zashtedaVodaPercent(state)
})
const mdtp = dispatch => ({
  change: val => dispatch(updateAction(val))
})

export default connect(
  mstp,
  mdtp
)(Page3)
