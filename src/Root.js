import React, { Component } from 'react'
import Navigation from './components/Navigation'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import Page1 from './pages/Page1'
import Page2 from './pages/Page2'
import Page3 from './pages/Page3'
import Page4 from './pages/Page4'
import History from './pages/History'
import Home from './pages/Home'
import Manual from './pages/Manual'

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navigation />
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route path="/home" component={Home} />
            <Route path="/manual" component={Manual} />
            <Route path="/page1" component={Page1} />
            <Route path="/page2" component={Page2} />
            <Route path="/page3" component={Page3} />
            <Route path="/page4" component={Page4} />
            <Route path="/history" component={History} />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default Root
