import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import PrevNext from '../components/PrevNext'
import Page from '../components/Page'
import round from '../util/round'
import { pageTitles } from '../util/constants'

import { selectors as selectors1 } from '../reducers/page1'
import { selectors as selectors4 } from '../reducers/page4'
import { selectors as selectors5 } from '../reducers/page5'
import { selectors as selectors6 } from '../reducers/page6'
import { selectors as selectors7 } from '../reducers/page7'

const prev = { to: '/page7', tooltip: pageTitles.page7 }

const Page8 = ({ data }) => (
  <Page title={'Преглед на постигнатите заштеди со редукција на притисокот'}>
    <Grid>
      <Row>
        <Col lg={10} sm={10} lgOffset={1} smOffset={1}>
          <PrevNext prev={prev}>
            <table>
              <tbody>
                <tr>
                  <th rowSpan={2}>Тип на редуктор</th>
                  <th colSpan={2}>Максимален притисок (m) </th>
                  <th>Вкупна потрошувачка во зоната</th>
                  <th colSpan={2}>Заштеда на вода </th>
                  <th>Нето годишен бенефит</th>
                </tr>
                <tr>
                  <th>Точка со средна вредност на пристисокот</th>
                  <th>Критична точка</th>
                  <th>
                    (m<sup>3</sup>/ден)
                  </th>
                  <th>
                    (m<sup>3</sup>/ден)
                  </th>
                  <th>%</th>
                  <th>мкд/год</th>
                </tr>
                <tr>
                  <th>Без контрола</th>
                  <td>{round(data.maxSredenPritisok, 2)}</td>
                  <td>{round(data.maxKritichenPritisok, 2)}</td>
                  <td>{round(data.sumVlezenProtok, 3)}</td>
                  <td />
                  <td />
                  <td />
                </tr>
                <tr>
                  <th>Редуктор со фиксен излез</th>
                  <td>{round(data.maxReduciranSredenPritisok3, 2)}</td>
                  <td>{round(data.maxReduciranKritichenPritisok3, 2)}</td>
                  <td>{round(data.sumRekalkulaciqNaVlezniotProtok3, 3)}</td>
                  <td>{round(data.zashtedaVodaM33, 3)}</td>
                  <td>{round(data.zashtedaVodaPercent3, 1)}</td>
                  <td>{round(data.npvProtok3, 2)}</td>
                </tr>
                <tr>
                  <th>Редуктор модулиран на база на временски интервали</th>
                  <td>{round(data.maxReduciranSredenPritisok4, 2)}</td>
                  <td>{round(data.maxReduciranKritichenPritisok4, 2)}</td>
                  <td>{round(data.sumRekalkulaciqNaVlezniotProtok4, 3)}</td>
                  <td>{round(data.zashtedaVodaM34, 3)}</td>
                  <td>{round(data.zashtedaVodaPercent4, 1)}</td>
                  <td>{round(data.npvProtok4, 2)}</td>
                </tr>
                <tr>
                  <th>Редуктор модулиран на база на проток</th>
                  <td>{round(data.maxReduciranSredenPritisok5, 2)}</td>
                  <td>{round(data.maxReduciranKritichenPritisok5, 2)}</td>
                  <td>{round(data.sumRekalkulaciqNaVlezniotProtok5, 3)}</td>
                  <td>{round(data.zashtedaVodaM35, 3)}</td>
                  <td>{round(data.zashtedaVodaPercent5, 1)}</td>
                  <td>{round(data.npvProtok5, 2)}</td>
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
  data: {
    maxSredenPritisok: selectors1.maxSredenPritisokSelector(state),
    maxKritichenPritisok: selectors1.maxKritichenPritisokSelector(state),
    sumVlezenProtok: selectors1.sumVlezenProtokSelector(state),

    ...selectors4.reductorSummarySelector(state),
    zashtedaVodaM33: selectors4.zashtedaVodaM3Selector(state),
    zashtedaVodaPercent3: selectors4.zashtedaVodaPercent(state),
    npvProtok3: selectors7.npvfiksenSelector(state),

    ...selectors5.reductorSummarySelector(state),
    zashtedaVodaM34: selectors5.zashtedaVodaM3Selector(state),
    zashtedaVodaPercent4: selectors5.zashtedaVodaPercent(state),
    npvProtok4: selectors7.npvintervalSelector(state),

    ...selectors6.reductorSummarySelector(state),
    zashtedaVodaM35: selectors6.zashtedaVodaM3Selector(state),
    zashtedaVodaPercent5: selectors6.zashtedaVodaPercent(state),
    npvProtok5: selectors7.npvProtokSelector(state)
  }
})

export default connect(mstp)(Page8)
