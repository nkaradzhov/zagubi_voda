import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import Highlight from '../components/Highlight'
import PrevNext from '../components/PrevNext'
import Page from '../components/Page'
import round from '../util/round'
import { pageTitles } from '../util/constants'

const prev = { to: '/page2', tooltip: pageTitles.page2 }
const next = { to: '/page4', tooltip: pageTitles.page4 }

const Newpage = () => {
  return (
    <Page title={'Преглед на постигнатите заштеди со редукција на притисокот'}>
      <Grid>
        <Row>
          <Col lg={10} sm={10} lgOffset={1} smOffset={1}>
            <PrevNext prev={prev} next={next}>
              <table>
                <tbody>
                  <tr>
                    <th>Опис</th>
                    <th>Почеток</th>
                    <th>Крај</th>
                    <th>Влез во систем</th>
                    <th>Среден притисок во зоната</th>
                    <th>Количини независни од работниот притисок во мрежата</th>
                    <th>Количини зависни од работниот притисок во мрежата</th>
                    <th colSpan={3}>Пресметка на N1</th>
                  </tr>
                  <tr>
                    <td />
                    <td />
                    <td />

                    <td>m3/h</td>
                    <td>m</td>
                    <td>m3/h</td>
                    <td>m3/h</td>
                    <td>Почеток</td>
                    <td>Фаза 1</td>
                    <td>Фаза 2</td>
                  </tr>
                  <tr>
                    <td>Почетни услови</td>
                    <td />
                    <td />

                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Чекор 1</td>
                    <td />
                    <td />

                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Чекор 2</td>
                    <td />
                    <td />

                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Чекор 3</td>
                    <td />
                    <td />

                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                  </tr>
                  <tr>
                    <td>Чекор 4</td>
                    <td />
                    <td />

                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                    <td />
                  </tr>
                </tbody>
              </table>
            </PrevNext>
          </Col>
        </Row>
      </Grid>
    </Page>
  )
}

export default Newpage
