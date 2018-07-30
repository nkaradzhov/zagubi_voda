import { path, assocPath } from 'ramda'
import { createSelector } from 'reselect'

const defaultState = {
  0: {
    hour: '0-1',
    vlezen: '',
    sreden: '',
    kritichen: '',
    protok: '',
    redukcijaNaVlezenPritisok: ''
  },
  1: {
    hour: '1-2',
    vlezen: '',
    sreden: '',
    kritichen: '',
    protok: '',
    redukcijaNaVlezenPritisok: ''
  },
  2: {
    hour: '2-3',
    vlezen: '',
    sreden: '',
    kritichen: '',
    protok: '',
    redukcijaNaVlezenPritisok: ''
  },
  3: {
    hour: '3-4',
    vlezen: '',
    sreden: '',
    kritichen: '',
    protok: '',
    redukcijaNaVlezenPritisok: ''
  },
  4: {
    hour: '4-5',
    vlezen: '',
    sreden: '',
    kritichen: '',
    protok: '',
    redukcijaNaVlezenPritisok: ''
  },
  5: {
    hour: '5-6',
    vlezen: '',
    sreden: '',
    kritichen: '',
    protok: '',
    redukcijaNaVlezenPritisok: ''
  },
  6: {
    hour: '6-7',
    vlezen: '',
    sreden: '',
    kritichen: '',
    protok: '',
    redukcijaNaVlezenPritisok: ''
  },
  7: {
    hour: '7-8',
    vlezen: '',
    sreden: '',
    kritichen: '',
    protok: '',
    redukcijaNaVlezenPritisok: ''
  },
  8: {
    hour: '8-9',
    vlezen: '',
    sreden: '',
    kritichen: '',
    protok: '',
    redukcijaNaVlezenPritisok: ''
  },
  9: {
    hour: '9-10',
    vlezen: '',
    sreden: '',
    kritichen: '',
    protok: '',
    redukcijaNaVlezenPritisok: ''
  },
  10: {
    hour: '10-11',
    vlezen: '',
    sreden: '',
    kritichen: '',
    protok: '',
    redukcijaNaVlezenPritisok: ' '
  },
  11: {
    hour: '11-12',
    vlezen: '',
    sreden: '',
    kritichen: '',
    protok: '',
    redukcijaNaVlezenPritisok: ''
  },
  12: {
    hour: '12-13',
    vlezen: '',
    sreden: '',
    kritichen: '',
    protok: '',
    redukcijaNaVlezenPritisok: ''
  },
  13: {
    hour: '13-14',
    vlezen: '',
    sreden: '',
    kritichen: '',
    protok: '',
    redukcijaNaVlezenPritisok: ''
  },
  14: {
    hour: '14-15',
    vlezen: '',
    sreden: '',
    kritichen: '',
    protok: '',
    redukcijaNaVlezenPritisok: ''
  },
  15: {
    hour: '15-16',
    vlezen: '',
    sreden: '',
    kritichen: '',
    protok: '',
    redukcijaNaVlezenPritisok: ''
  },
  16: {
    hour: '16-17',
    vlezen: '',
    sreden: '',
    kritichen: '',
    protok: '',
    redukcijaNaVlezenPritisok: ''
  },
  17: {
    hour: '17-18',
    vlezen: '',
    sreden: '',
    kritichen: '',
    protok: '',
    redukcijaNaVlezenPritisok: ''
  },
  18: {
    hour: '18-19',
    vlezen: '',
    sreden: '',
    kritichen: '',
    protok: '',
    redukcijaNaVlezenPritisok: ''
  },
  19: {
    hour: '19-20',
    vlezen: '',
    sreden: '',
    kritichen: '',
    protok: '',
    redukcijaNaVlezenPritisok: ''
  },
  20: {
    hour: '20-21',
    vlezen: '',
    sreden: '',
    kritichen: '',
    protok: '',
    redukcijaNaVlezenPritisok: ''
  },
  21: {
    hour: '21-22',
    vlezen: '',
    sreden: '',
    kritichen: '',
    protok: '',
    redukcijaNaVlezenPritisok: ''
  },
  22: {
    hour: '22-23',
    vlezen: '',
    sreden: '',
    kritichen: '',
    protok: '',
    redukcijaNaVlezenPritisok: ''
  },
  23: {
    hour: '23-24',
    vlezen: '',
    sreden: '',
    kritichen: '',
    protok: '',
    redukcijaNaVlezenPritisok: ''
  }
}

const minRowSelector = createSelector(path(['page1']), page1 => {
  let min = null
  for (let row of Object.values(page1)) {
    const protok = parseFloat(row.protok, 10)
    if (!isNaN(protok)) {
      if (!min) min = row
      if (parseFloat(min.protok, 10) > protok) min = row
    }
  }
  return min
})

const minRowHourSelector = createSelector(
  minRowSelector,
  row => (row ? row.hour : '')
)

const minProtokSelector = createSelector(
  minRowSelector,
  row => (row ? row.protok : '')
)
const minSredenSelector = createSelector(
  minRowSelector,
  row => (row ? row.sreden : '')
)

export const selectors = {
  minRowSelector,
  minRowHourSelector,
  minProtokSelector,
  minSredenSelector
}

const UPDATE_VLEZEN = 'UPDATE_VLEZEN'
const UPDATE_SREDEN = 'UPDATE_SREDEN'
const UPDATE_KRITICHEN = 'UPDATE_KRITICHEN'
const UPDATE_PROTOK = 'UPDATE_PROTOK'
const UPDATE_REDUKCIJA = 'UPDATE_REDUKCIJA'

const updateValAction = type => (key, val) => ({ type, key, val })
export const updateVlezen = updateValAction(UPDATE_VLEZEN)
export const updateSreden = updateValAction(UPDATE_SREDEN)
export const updateKritichen = updateValAction(UPDATE_KRITICHEN)
export const updateProtok = updateValAction(UPDATE_PROTOK)
export const updateRedukcija = updateValAction(UPDATE_REDUKCIJA)

const updateState = (state, action) => {
  const prop = {
    UPDATE_VLEZEN: 'vlezen',
    UPDATE_SREDEN: 'sreden',
    UPDATE_KRITICHEN: 'kritichen',
    UPDATE_PROTOK: 'protok',
    UPDATE_REDUKCIJA: 'redukcijaNaVlezenPritisok'
  }[action.type]

  return prop ? assocPath([action.key, prop], Number(action.val), state) : state
}
export default (state = defaultState, action) => updateState(state, action)
