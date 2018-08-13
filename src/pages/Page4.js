import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { updateRedukcija } from '../reducers/page1'
import { selectors } from '../reducers/page4'
import NumberInput from '../components/NumberInput'
import PrevNext from '../components/PrevNext'
import round from '../util/round'
import Page from '../components/Page'
import { pageTitles } from '../util/constants'

const prev = { to: '/page3', tooltip: pageTitles.page3 }
const next = { to: '/page5', tooltip: pageTitles.page5 }

const Page4 = ({
  data,
  zashtedaVodaM3,
  zashtedaVodaPercent,
  change,
  inputData
}) => (
  <Page title={pageTitles.page4}>
    <Grid>
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
                      <NumberInput
                        autoFocus={val.hour === '0-1'}
                        value={inputData[i].redukcijaNaVlezenPritisok || ''}
                        onChange={val => change(i, val)}
                      />
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
  data: selectors.page4DataSelector(state),
  zashtedaVodaM3: selectors.zashtedaVodaM3Selector(state),
  zashtedaVodaPercent: selectors.zashtedaVodaPercent(state),
  inputData: state.page1
})
const mdtp = dispatch => ({
  change: (key, val) => dispatch(updateRedukcija(key, val))
})

export default connect(
  mstp,
  mdtp
)(Page4)
