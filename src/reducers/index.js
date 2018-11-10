import page1 from './page1'
import page2 from './page2'
import page3 from './page3'
import page4 from './page4'
import page6 from './page6'
import page7 from './page7'
//import page8 from './page8'

export default (state = {}, action) => {
  if (action.type === 'LOAD_PERSISTED_STATE') {
    return action.payload
  }
  return {
    page1: page1(state.page1, action),
    page2: page2(state.page2, action),
    page3: page3(state.page3, action),
    page4: page4(state.page4, action),
    page6: page6(state.page6, action),
    page7: page7(state.page7, action)
  }
}
