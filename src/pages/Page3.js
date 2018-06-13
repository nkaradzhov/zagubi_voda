import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { selectors } from '../selectors/Page3Selectors'

const Page3 = ({
  //ask for any selected data here
  data
}) => (
  <Grid>
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
                <td colSpan={1}>{val.reduciranVlezen}</td>
                <td colSpan={1}>{val.novSredenPritisok}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Col>
    </Row>
  </Grid>
)

const mstp = state => ({
  data: selectors.page3DataSelector(state)
})

export default connect(mstp)(Page3)
