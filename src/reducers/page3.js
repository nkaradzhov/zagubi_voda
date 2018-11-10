import { path, assocPath } from 'ramda'
import { createSelector } from 'reselect'
import { selectors as selectors2 } from './page2'

const defaultState = {
  pochetni: {
    pochetok: '',
    krai: '',
    vlez: '',
    sredenPritisok: ''
  },
  chekor1: {
    pochetok: '',
    krai: '',
    vlez: '',
    sredenPritisok: ''
  },
  chekor2: {
    pochetok: '',
    krai: '',
    vlez: '',
    sredenPritisok: ''
  },
  chekor3: {
    pochetok: '',
    krai: '',
    vlez: '',
    sredenPritisok: ''
  },
  chekor4: {
    pochetok: '',
    krai: '',
    vlez: '',
    sredenPritisok: ''
  }
}

const derivedDataSelector = createSelector(
  [path(['page3']), selectors2.pressureIndependentFlowAtMNFSelector],
  (
    { pochetni, chekor1, chekor2, chekor3, chekor4 },
    pressureIndependentFlowAtMNF
  ) => {
    const _pochetni = {
      nezavisni: pochetni.vlez - pressureIndependentFlowAtMNF,
      pochetokQ0: '',
      faza1Q0: '',
      faza2Q0: '',
      pochetokP0: '',
      faza1P0: '',
      faza2P0: '',
      pochetokN1: '',
      faza1N1: '',
      faza2N1: ''
    }
    const _chekor1 = {
      nezavisni: chekor1.vlez - pressureIndependentFlowAtMNF,
      pochetokQ0: 1,
      faza1Q0: '',
      faza2Q0: '',
      pochetokP0: 1,
      faza1P0: '',
      faza2P0: '',
      pochetokN1: '',
      faza1N1: '',
      faza2N1: ''
    }
    const _chekor2 = {
      nezavisni: chekor2.vlez - pressureIndependentFlowAtMNF,
      faza1Q0: '',
      faza2Q0: '',
      faza1P0: '',
      faza2P0: '',
      pochetokN1:
        Math.log(_pochetni.nezavisni / _chekor1.nezavisni) /
        Math.log(pochetni.sredenPritisok / chekor1.sredenPritisok),
      faza1N1: '',
      faza2N1: ''
    }

    const _chekor3 = {
      nezavisni: chekor3.vlez - pressureIndependentFlowAtMNF,
      faza2Q0: '',
      faza2P0: '',
      pochetokN1:
        Math.log(_pochetni.nezavisni / _chekor2.nezavisni) /
        Math.log(pochetni.sredenPritisok / chekor2.sredenPritisok),
      faza1N1:
        Math.log(_chekor1.nezavisni / _chekor2.nezavisni) /
        Math.log(chekor1.sredenPritisok / chekor2.sredenPritisok),
      faza2N1: ''
    }

    const _chekor4 = {
      nezavisni: chekor4.vlez - pressureIndependentFlowAtMNF,
      pochetokN1:
        Math.log(_pochetni.nezavisni / _chekor3.nezavisni) /
        Math.log(pochetni.sredenPritisok / chekor3.sredenPritisok),
      faza1N1:
        Math.log(_chekor1.nezavisni / _chekor3.nezavisni) /
        Math.log(chekor1.sredenPritisok / chekor3.sredenPritisok),
      faza2N1:
        Math.log(_chekor2.nezavisni / _chekor3.nezavisni) /
        Math.log(chekor2.sredenPritisok / chekor3.sredenPritisok)
    }

    return {
      pressureIndependentFlowAtMNF,
      pochetni: _pochetni,
      chekor1: _chekor1,
      chekor2: _chekor2,
      chekor3: _chekor3,
      chekor4: _chekor4
    }
  }
)

export const selectors = { derivedDataSelector }

const P3_UPDATE = 'P3_UPDATE'
export const updateAction = (key1, key2, val) => ({
  type: P3_UPDATE,
  key1,
  key2,
  val
})

const updateState = (state, { key1, key2, val }) =>
  assocPath([key1, key2], val, state)

export default (state = defaultState, action) =>
  action.type === P3_UPDATE ? updateState(state, action) : state
