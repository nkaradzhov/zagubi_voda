const defaultState = {
  0: { hour: '0-1', vlezen: 0, sreden: 0, kritichen: 0, protok: 0 },
  1: { hour: '1-2', vlezen: 0, sreden: 0, kritichen: 0, protok: 0 },
  2: { hour: '2-3', vlezen: 0, sreden: 0, kritichen: 0, protok: 0 },
  3: { hour: '3-4', vlezen: 0, sreden: 0, kritichen: 0, protok: 0 },
  4: { hour: '4-5', vlezen: 0, sreden: 0, kritichen: 0, protok: 0 },
  5: { hour: '5-6', vlezen: 0, sreden: 0, kritichen: 0, protok: 0 },
  6: { hour: '6-7', vlezen: 0, sreden: 0, kritichen: 0, protok: 0 },
  7: { hour: '7-8', vlezen: 0, sreden: 0, kritichen: 0, protok: 0 },
  8: { hour: '8-9', vlezen: 0, sreden: 0, kritichen: 0, protok: 0 },
  9: { hour: '9-10', vlezen: 0, sreden: 0, kritichen: 0, protok: 0 },
  10: { hour: '10-11', vlezen: 0, sreden: 0, kritichen: 0, protok: 0 },
  11: { hour: '11-12', vlezen: 0, sreden: 0, kritichen: 0, protok: 0 },
  12: { hour: '12-13', vlezen: 0, sreden: 0, kritichen: 0, protok: 0 },
  13: { hour: '13-14', vlezen: 0, sreden: 0, kritichen: 0, protok: 0 },
  14: { hour: '14-15', vlezen: 0, sreden: 0, kritichen: 0, protok: 0 },
  15: { hour: '15-16', vlezen: 0, sreden: 0, kritichen: 0, protok: 0 },
  16: { hour: '16-17', vlezen: 0, sreden: 0, kritichen: 0, protok: 0 },
  17: { hour: '17-18', vlezen: 0, sreden: 0, kritichen: 0, protok: 0 },
  18: { hour: '18-19', vlezen: 0, sreden: 0, kritichen: 0, protok: 0 },
  19: { hour: '19-20', vlezen: 0, sreden: 0, kritichen: 0, protok: 0 },
  20: { hour: '20-21', vlezen: 0, sreden: 0, kritichen: 0, protok: 0 },
  21: { hour: '21-22', vlezen: 0, sreden: 0, kritichen: 0, protok: 0 },
  22: { hour: '22-23', vlezen: 0, sreden: 0, kritichen: 0, protok: 0 },
  23: { hour: '23-24', vlezen: 0, sreden: 0, kritichen: 0, protok: 0 }
}

const updateValAction = type => (key, val) => ({ type, key, val })

const UPDATE_VLEZEN = 'UPDATE_VLEZEN'
const UPDATE_SREDEN = 'UPDATE_SREDEN'
const UPDATE_KRITICHEN = 'UPDATE_KRITICHEN'
const UPDATE_PROTOK = 'UPDATE_PROTOK'

export const updateVlezen = updateValAction(UPDATE_VLEZEN)
export const updateSreden = updateValAction(UPDATE_SREDEN)
export const updateKritichen = updateValAction(UPDATE_KRITICHEN)
export const updateProtok = updateValAction(UPDATE_PROTOK)

export default (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_VLEZEN:
      return {
        ...state,
        [action.key]: { ...state[action.key], vlezen: action.val }
      }
    case UPDATE_SREDEN:
      return {
        ...state,
        [action.key]: { ...state[action.key], sreden: action.val }
      }
    case UPDATE_KRITICHEN:
      return {
        ...state,
        [action.key]: { ...state[action.key], kritichen: action.val }
      }
    case UPDATE_PROTOK:
      return {
        ...state,
        [action.key]: { ...state[action.key], protok: action.val }
      }
    default:
      return state
  }
}
