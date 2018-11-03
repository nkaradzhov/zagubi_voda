import React from 'react'
import {
  Grid,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Glyphicon
} from 'react-bootstrap'
import { connect } from 'react-redux'
import Highlight from '../components/Highlight'
import PrevNext from '../components/PrevNext'
import Page from '../components/Page'
import round from '../util/round'
import { pageTitles } from '../util/constants'

import { selectors as selectors1 } from '../reducers/page1'
import { selectors as selectors3 } from '../reducers/page3'
import { selectors as selectors4 } from '../reducers/page4'
import { selectors as selectors5 } from '../reducers/page5'
import { selectors as selectors6 } from '../reducers/page6'

const BigTd = ({ ...rest }) => (
  <td
    style={{
      textAlign: 'left',
      paddingLeft: '0.5em'
    }}
    colSpan={5}
    {...rest}
  />
)
const SmallTd = ({ ...rest }) => <td colSpan={1} {...rest} />
const Highlighted = ({ children, ...rest }) => (
  <Highlight>
    <SmallTd {...rest}>{children}</SmallTd>
  </Highlight>
)

const WithTooltip = ({ id, tooltip, children }) => (
  <OverlayTrigger
    overlay={<Tooltip id={id}>{tooltip}</Tooltip>}
    placement="bottom"
  >
    <BigTd>
      {children}
      <Glyphicon glyph="info-sign" style={{ marginLeft: '1em' }} />
    </BigTd>
  </OverlayTrigger>
)

const prev = { to: '/page6', tooltip: pageTitles.page6 }

const Page7 = ({ data }) => (
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
                  <th>(m3/ден)</th>
                  <th>(m3/ден)</th>
                  <th>%</th>
                  <th>мкд/год</th>
                </tr>
                <tr>
                  <th>Без контрола</th>
                  <td>{round(data.maxSredenPritisok, 2)}</td>
                  <td>{round(data.maxKritichenPritisok, 2)}</td>
                  <td>{round(data.sumVlezenProtok, 2)}</td>
                  <td />
                  <td />
                  <td />
                </tr>
                <tr>
                  <th>Редуктор со фиксен излез</th>
                  <td>{round(data.maxReduciranSredenPritisok3, 2)}</td>
                  <td>{round(data.maxReduciranKritichenPritisok3, 2)}</td>
                  <td>{round(data.sumRekalkulaciqNaVlezniotProtok3, 2)}</td>
                  <td>{round(data.zashtedaVodaM33, 2)}</td>
                  <td>{round(data.zashtedaVodaPercent3, 2)}</td>
                  <td>{round(data.npvProtok3, 2)}</td>
                </tr>
                <tr>
                  <th>Редуктор модулиран на база на временски интервали</th>
                  <td>{round(data.maxReduciranSredenPritisok4, 2)}</td>
                  <td>{round(data.maxReduciranKritichenPritisok4, 2)}</td>
                  <td>{round(data.sumRekalkulaciqNaVlezniotProtok4, 2)}</td>
                  <td>{round(data.zashtedaVodaM34, 2)}</td>
                  <td>{round(data.zashtedaVodaPercent4, 2)}</td>
                  <td>{round(data.npvProtok4, 2)}</td>
                </tr>
                <tr>
                  <th>Редуктор модулиран на база на проток</th>
                  <td>{round(data.maxReduciranSredenPritisok5, 2)}</td>
                  <td>{round(data.maxReduciranKritichenPritisok5, 2)}</td>
                  <td>{round(data.sumRekalkulaciqNaVlezniotProtok5, 2)}</td>
                  <td>{round(data.zashtedaVodaM35, 2)}</td>
                  <td>{round(data.zashtedaVodaPercent5, 2)}</td>
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

    ...selectors3.reductorSummarySelector(state),
    zashtedaVodaM33: selectors3.zashtedaVodaM3Selector(state),
    zashtedaVodaPercent3: selectors3.zashtedaVodaPercent(state),
    npvProtok3: selectors6.npvfiksenSelector(state),

    ...selectors4.reductorSummarySelector(state),
    zashtedaVodaM34: selectors4.zashtedaVodaM3Selector(state),
    zashtedaVodaPercent4: selectors4.zashtedaVodaPercent(state),
    npvProtok4: selectors6.npvintervalSelector(state),

    ...selectors5.reductorSummarySelector(state),
    zashtedaVodaM35: selectors5.zashtedaVodaM3Selector(state),
    zashtedaVodaPercent5: selectors5.zashtedaVodaPercent(state),
    npvProtok5: selectors6.npvProtokSelector(state)
  }
})

export default connect(mstp)(Page7)
