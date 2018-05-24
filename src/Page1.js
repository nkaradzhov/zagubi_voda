import React, { Component } from 'react'
import { Table, Grid, Row, Col, FormControl } from 'react-bootstrap'

class Page1 extends Component {
  state = {
    hours: [
      { key: '0-1', value1: '' },
      { key: '1-2', value1: '' },
      { key: '2-3', value1: '' },
      { key: '3-4', value1: '' },
      { key: '4-5', value1: '' },
      { key: '5-6', value1: '' },
      { key: '6-7', value1: '' },
      { key: '7-8', value1: '' },
      { key: '8-9', value1: '' },
      { key: '9-10', value1: '' },
      { key: '10-11', value1: '' },
      { key: '11-12', value1: '' },
      { key: '12-13', value1: '' },
      { key: '13-14', value1: '' },
      { key: '14-15', value1: '' },
      { key: '15-16', value1: '' },
      { key: '16-17', value1: '' },
      { key: '17-18', value1: '' },
      { key: '18-19', value1: '' },
      { key: '19-20', value1: '' },
      { key: '20-21', value1: '' },
      { key: '21-22', value1: '' },
      { key: '22-23', value1: '' },
      { key: '23-24', value1: '' }
    ]
  }
  makeOnValue1Change(index) {
    return e =>
      this.setState({
        hours: this.state.hours.map(
          (h, i) => (index === i ? { ...h, value1: e.target.value } : h)
        )
      })
  }

  makeTr(obj, i) {
    return (
      <tr>
        <td>{obj.key}</td>
        <td>
          <FormControl
            value={obj.value1}
            onChange={this.makeOnValue1Change(i)}
            type="text"
          />
        </td>
        <td>
          <FormControl type="text" />
        </td>
        <td>
          <FormControl type="text" />
        </td>
        <td>
          <FormControl type="text" />
        </td>
      </tr>
    )
  }

  render() {
    const { hours } = this.state

    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12}>
            {hours.reduce((all, h) => all + Number(h.value1), 0)}
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th>Час</th>
                  <th>Влезен притисок (m)</th>
                  <th>Среден притисок (m)</th>
                  <th>Критичен притисок (m)</th>
                  <th>Влезен проток (m3/h)</th>
                </tr>
              </thead>
              <tbody>{hours.map(this.makeTr.bind(this))}</tbody>
            </Table>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default Page1
