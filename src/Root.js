import React, { Component } from 'react'
import Navigation from './Navigation'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const Home = () => <div>home</div>
const About = () => <div>about</div>
const Topics = () => <div>topic</div>

class Root extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navigation />
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/topics" component={Topics} />
        </div>
      </Router>
    )
  }
}

export default Root
