import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { selectors, updateAction } from '../reducers/page4'
import NumberInput from '../components/NumberInput'
import PrevNext from '../components/PrevNext'
import round from '../util/round'
import { pageTitles } from '../util/constants'
import Page from '../components/Page'

const prev = { to: '/page3', tooltip: pageTitles.page3 }
const next = { to: '/page5', tooltip: pageTitles.page5 }

const Page4 = ({
  data,
  redukcijaNaVlezenPritisok,
  zashtedaVodaM3,
  zashtedaVodaPercent,
  change
}) => (
  <Page title={pageTitles.page4}>
    <Grid>
      <Row className="show-grid">
        <Col lg={8} sm={10} lgOffset={2} smOffset={1}>
          <table>
            <tbody>
              <tr>
                <td colSpan={4}>Редукција на влезниот притисок, m</td>
                <td>
                  <NumberInput
                    value={redukcijaNaVlezenPritisok}
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
                    Рекалкулиран влезен проток во систем, m<sup>3</sup>/h
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((val, i) => (
                  <tr key={i}>
                    <td colSpan={1}>{val.hour}</td>
                    <td colSpan={1}>{round(val.reduciranVlezenPritisok, 2)}</td>
                    <td colSpan={1}>{round(val.novSredenPritisok, 2)}</td>
                    <td colSpan={1}>{round(val.novKritichenPritisok, 2)}</td>
                    <td colSpan={1}>
                      {round(val.rekalkulaciqNaVlezniotProtok, 3)}
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
                <td>{round(zashtedaVodaM3, 3)}</td>
              </tr>
              <tr>
                <td>Заштеда на вода ( % )</td>
                <td>{round(zashtedaVodaPercent, 1)}</td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row>
    </Grid>
  </Page>
)

const mstp = state => ({
  data: selectors.page4DataSelector(state),
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
)(Page4)
