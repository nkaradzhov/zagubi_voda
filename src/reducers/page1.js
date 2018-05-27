import { assocPath } from 'ramda'

const defaultState = {
  0: { hour: '0-1', vlezen: '', sreden: '', kritichen: '', protok: '' },
  1: { hour: '1-2', vlezen: '', sreden: '', kritichen: '', protok: '' },
  2: { hour: '2-3', vlezen: '', sreden: '', kritichen: '', protok: '' },
  3: { hour: '3-4', vlezen: '', sreden: '', kritichen: '', protok: '' },
  4: { hour: '4-5', vlezen: '', sreden: '', kritichen: '', protok: '' },
  5: { hour: '5-6', vlezen: '', sreden: '', kritichen: '', protok: '' },
  6: { hour: '6-7', vlezen: '', sreden: '', kritichen: '', protok: '' },
  7: { hour: '7-8', vlezen: '', sreden: '', kritichen: '', protok: '' },
  8: { hour: '8-9', vlezen: '', sreden: '', kritichen: '', protok: '' },
  9: { hour: '9-10', vlezen: '', sreden: '', kritichen: '', protok: '' },
  10: { hour: '10-11', vlezen: '', sreden: '', kritichen: '', protok: '' },
  11: { hour: '11-12', vlezen: '', sreden: '', kritichen: '', protok: '' },
  12: { hour: '12-13', vlezen: '', sreden: '', kritichen: '', protok: '' },
  13: { hour: '13-14', vlezen: '', sreden: '', kritichen: '', protok: '' },
  14: { hour: '14-15', vlezen: '', sreden: '', kritichen: '', protok: '' },
  15: { hour: '15-16', vlezen: '', sreden: '', kritichen: '', protok: '' },
  16: { hour: '16-17', vlezen: '', sreden: '', kritichen: '', protok: '' },
  17: { hour: '17-18', vlezen: '', sreden: '', kritichen: '', protok: '' },
  18: { hour: '18-19', vlezen: '', sreden: '', kritichen: '', protok: '' },
  19: { hour: '19-20', vlezen: '', sreden: '', kritichen: '', protok: '' },
  20: { hour: '20-21', vlezen: '', sreden: '', kritichen: '', protok: '' },
  21: { hour: '21-22', vlezen: '', sreden: '', kritichen: '', protok: '' },
  22: { hour: '22-23', vlezen: '', sreden: '', kritichen: '', protok: '' },
  23: { hour: '23-24', vlezen: '', sreden: '', kritichen: '', protok: '' }
}

export const getMinRow = state => {
  let min = null
  for (let key of Object.keys(state.page1)) {
    const row = state.page1[key]
    const protok = parseInt(row.protok, 10)
    if (!isNaN(protok)) {
      if (!min) min = row
      if (parseInt(min.protok, 10) > protok) min = row
    }
  }
  return min || {protok:0, sreden:0}
}

const UPDATE_VLEZEN = 'UPDATE_VLEZEN'
const UPDATE_SREDEN = 'UPDATE_SREDEN'
const UPDATE_KRITICHEN = 'UPDATE_KRITICHEN'
const UPDATE_PROTOK = 'UPDATE_PROTOK'

const updateValAction = type => (key, val) => ({ type, key, val })
export const updateVlezen = updateValAction(UPDATE_VLEZEN)
export const updateSreden = updateValAction(UPDATE_SREDEN)
export const updateKritichen = updateValAction(UPDATE_KRITICHEN)
export const updateProtok = updateValAction(UPDATE_PROTOK)

const updateState = (state, action) => {
  const prop = {
    UPDATE_VLEZEN: 'vlezen',
    UPDATE_SREDEN: 'sreden',
    UPDATE_KRITICHEN: 'kritichen',
    UPDATE_PROTOK: 'protok'
  }[action.type]

  return prop ? assocPath([action.key, prop], action.val, state) : state
}
export default (state = defaultState, action) => updateState(state, action)
