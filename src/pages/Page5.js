import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { updateAction } from '../reducers/page5'
import { selectors } from '../reducers/page5'
import NumberInput from '../components/NumberInput'
import PrevNext from '../components/PrevNext'
import round from '../util/round'
import Page from '../components/Page'
import { pageTitles } from '../util/constants'

const prev = { to: '/page4', tooltip: pageTitles.page4 }
const next = { to: '/page6', tooltip: pageTitles.page6 }

const Page5 = ({
  data,
  zashtedaVodaM3,
  zashtedaVodaPercent,
  change,
  inputData,
  dozvolenKritichenPritisok
}) => (
  <Page title={pageTitles.page5}>
    <Grid>
      <Row className="show-grid">
        <Col lg={8} sm={10} lgOffset={2} smOffset={1}>
          <table>
            <tbody>
              <tr>
                <td colSpan={4}>Дозволена вредност на критичниот притисок</td>
                <td>
                  <NumberInput
                    value={dozvolenKritichenPritisok}
                    onChange={change}
                    autoFocus
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row>
      <Row className="show-grid">
        <Col lg={8} sm={10} lgOffset={2} smOffset={1}>
          <PrevNext prev={prev} next={next}>
            <table>
              <thead>
                <tr>
                  <th>Час</th>
                  <th>Редукција на влезниот притисок</th>
                  <th>Редуциран влезен притисок</th>
                  <th>Дефиниран среден притисок</th>
                  <th>Нов пресметан критичен притисок</th>
                </tr>
              </thead>
              <tbody>
                {data.map((val, i) => (
                  <tr key={i}>
                    <td colSpan={1}>{val.hour}</td>
                    <td colSpan={1}>
                      {round(val.redukcijaNaVlezenPritisok) || 0}
                    </td>
                    <td colSpan={1}>{round(val.reduciranVlezenPritisok)}</td>
                    <td colSpan={1}>{round(val.novSredenPritisok)}</td>
                    <td colSpan={1}>{round(val.novKritichenPritisok)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </PrevNext>
        </Col>
      </Row>
      <Row className="show-grid">
        <Col lg={8} sm={10} lgOffset={2} smOffset={1}>
          <table>
            <tbody>
              <tr>
                <td>Заштеда на вода ( m3/ден )</td>
                <td>{round(zashtedaVodaM3)}</td>
              </tr>
              <tr>
                <td>Заштеда на вода ( % )</td>
                <td>{round(zashtedaVodaPercent)}</td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row>
    </Grid>
  </Page>
)

const mstp = state => ({
  dozvolenKritichenPritisok: state.page5.dozvolenKritichenPritisok,
  data: selectors.page5DataSelector(state),
  zashtedaVodaM3: selectors.zashtedaVodaM3Selector(state),
  zashtedaVodaPercent: selectors.zashtedaVodaPercent(state),
  inputData: state.page1
})
const mdtp = dispatch => ({
  change: val => dispatch(updateAction(val))
})

export default connect(
  mstp,
  mdtp
)(Page5)
