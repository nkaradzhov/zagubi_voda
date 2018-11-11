import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { updateAction } from '../reducers/page6'
import { selectors } from '../reducers/page6'
import NumberInput from '../components/NumberInput'
import PrevNext from '../components/PrevNext'
import round from '../util/round'
import Page from '../components/Page'
import { pageTitles } from '../util/constants'

const prev = { to: '/page5', tooltip: pageTitles.page5 }
const next = { to: '/page7', tooltip: pageTitles.page7 }

const Page6 = ({
  data,
  zashtedaVodaM3,
  zashtedaVodaPercent,
  change,
  inputData,
  dozvolenKritichenPritisok
}) => (
  <Page title={pageTitles.page6}>
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
                  <th>Редуциран влезен притисок, m</th>
                  <th>Редуциран среден притисок, m</th>
                  <th>Редуциран критичен притисок, m</th>
                  <th>
                    Рекалкулиран влезен проток во систем, m<sup>3</sup>/h,{' '}
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((val, i) => (
                  <tr key={i}>
                    <td colSpan={1}>{val.hour}</td>
                    <td colSpan={1}>{round(val.reduciranVlezenPritisok)}</td>
                    <td colSpan={1}>{round(val.novSredenPritisok)}</td>
                    <td colSpan={1}>{round(val.novKritichenPritisok)}</td>
                    <td colSpan={1}>
                      {round(val.rekalkulaciqNaVlezniotProtok) || 0}
                    </td>
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
                <td>
                  Заштеда на вода ( m<sup>3</sup>/ден )
                </td>
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
  dozvolenKritichenPritisok: state.page6.dozvolenKritichenPritisok,
  data: selectors.page6DataSelector(state),
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
)(Page6)
