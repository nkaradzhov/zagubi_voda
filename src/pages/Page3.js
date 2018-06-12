import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import NumberInput from '../components/NumberInput'
import { connect } from 'react-redux'

const Page3 = () => (
  <Grid>
    <Row className="show-grid">
      <Col lg={8} sm={10} lgOffset={2} smOffset={1}>
        <table>
          <thead>
            <tr>
              <th>Час</th>
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

export default Page3
