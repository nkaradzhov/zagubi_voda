import React, { Component } from 'react'
import Navigation from './components/Navigation'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import Page1 from './pages/Page1'
import Page2 from './pages/Page2'
import Page3 from './pages/Page3'
import Page4 from './pages/Page4'
import Page5 from './pages/Page5'
import Page6 from './pages/Page6'
//import Page7 from './pages/Page7'
import History from './pages/History'
import Home from './pages/Home'
import Manual from './pages/Manual'
import References from './pages/References'

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
            <Route path="/page5" component={Page5} />
            <Route path="/page6" component={Page6} />
            <Route path="/references" component={References} />
            // <Route path="/page7" component={Page5} />
            <Route path="/history" component={History} />
          </div>
        </Router>
      </Provider>
    )
  }
}

export default Root
