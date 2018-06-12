import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import selectors3 from '../selectors/Page3Selectors'

const Page3 = ({
  //ask for any selected data here
  foo
}) => (
  <Grid>
    <Row className="show-grid">
      <Col lg={8} sm={10} lgOffset={2} smOffset={1}>
        <table>
          <thead>
            <tr>
              <th>{foo}</th>
              <th>Влезен притисок (m)</th>
              <th>Среден притисок (m)</th>
              <th>Критичен притисок (m)</th>
              <th>Влезен проток (m3/h)</th>
            </tr>
          </thead>
          <tbody />
        </table>
      </Col>
    </Row>
  </Grid>
)

const mstp = state => ({
  //call selectors3 here
  foo: selectors3.foo()
})

export default connect(mstp)(Page3)
