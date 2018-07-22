import page1 from './page1'
import page2 from './page2'
import page3 from './page3'

export default (state = {}, action) => {
  if (action.type === 'LOAD_PERSISTED_STATE') {
    return action.payload
  }
  return {
    page1: page1(state.page1, action),
    page2: page2(state.page2, action),
    page3: page3(state.page3, action)
  }
}
