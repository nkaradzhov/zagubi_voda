import React, { Component } from 'react'
import Navigation from './components/Navigation'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import Page1 from './pages/Page1'
import Page2 from './pages/Page2'

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
            <Route path="/page1" component={Page1} />
            <Route path="/page2" component={Page2} />
            <Route path="/about" component={About} />
            <Route path="/topics" component={Topics} />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default Root
