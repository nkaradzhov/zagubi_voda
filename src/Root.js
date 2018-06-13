import React, { Component } from 'react'
import Navigation from './components/Navigation'
import { HashRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import Page1 from './pages/Page1'
import Page2 from './pages/Page2'
import Page3 from './pages/Page3'

const Home = () => <h1>Home Page</h1>

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
            <Route path="/page3" component={Page3} />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default Root
