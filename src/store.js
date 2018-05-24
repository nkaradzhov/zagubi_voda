import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
// import { composeWithDevTools } from 'redux-devtools-extension'

const initialState = {}
const enhancers = []
const middleware = []

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers)

const store = createStore(rootReducer, initialState, composedEnhancers)

export default store
