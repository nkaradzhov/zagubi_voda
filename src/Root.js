import React, { Component } from 'react'
import Navigation from './Navigation'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import Page1 from './Page1'

const Home = () => <h1>Home Page</h1>
const About = () => <div>about</div>
const Topics = () => <div>topic</div>

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navigation />
            <Route exact path="/" component={Home} />
            <Route exact path="/page1" component={Page1} />
            <Route path="/about" component={About} />
            <Route path="/topics" component={Topics} />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default Root
