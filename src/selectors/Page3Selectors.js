import { path, assocPath } from 'ramda'
import { createSelector } from 'reselect'
import { selectors as selectors1 } from '../reducers/page1'
import { selectors as selectors2 } from '../reducers/page2'

const defaultState = {
  reduciranVlezen: 30.25
}

const getPressureDependentFlow = (
  pressureIndependentFlowAtMNF,
  minRow,
  row,
  pressureExponentN1
) => {
  if (!minRow) return ''
  return row.hour === minRow.hour
    ? minRow.protok - pressureIndependentFlowAtMNF
    : (minRow.protok - pressureIndependentFlowAtMNF) *
        Math.pow(row.vlezen / minRow.vlezen, pressureExponentN1)
}

const getPressureIndependentFlow = (
  row,
  minRow,
  pressureDependentFlow,
  pressureIndependentFlowAtMNF
) => {
  if (!minRow) return ''
  return row.hour === minRow.hour
    ? pressureIndependentFlowAtMNF
    : row.protok - pressureDependentFlow
}

const getKFaktorST = row => (row.vlezen - row.sreden) / row.protok

const getKFaktorKT = row => (row.vlezen - row.kritichen) / row.protok

const getRedukcijaNaVlezenPritisok = (row, reduciranVlezen) =>
  row.vlezen - reduciranVlezen

const getNovSredenPritisok = (
  row,
  redukcijaNaVlezenPritisok,
  pressureDependentFlow,
  pressureIndependentFlow,
  pressureExponentN1,
  kFaktorST,
  reduciranVlezen
) => {
  let l = row.sreden - redukcijaNaVlezenPritisok
  let m = pressureDependentFlow * Math.pow(l / row.sreden, pressureExponentN1)
  let n = m + pressureIndependentFlow
  let o = kFaktorST * Math.pow(n, 2)
  let nov = reduciranVlezen - o
  // if (redukcijaNaVlezenPritisok != nov) {
  if (Math.abs(redukcijaNaVlezenPritisok - nov) > 0.0001) {
    return getNovSredenPritisok(
      row,
      nov,
      pressureDependentFlow,
      pressureIndependentFlow,
      pressureExponentN1,
      kFaktorST,
      reduciranVlezen
    )
  } else {
    return nov
  }
}

const page3DataSelector = createSelector(
  [
    selectors2.pressureIndependentFlowAtMNFSelector,
    selectors1.minRowSelector,
    path(['page1']),
    path(['page2', 'pressureExponentN1']),
    path(['page3', 'reduciranVlezen'])
  ],
  (
    pressureIndependentFlowAtMNF,
    minRow,
    page1,
    pressureExponentN1,
    reduciranVlezen
  ) =>
    Object.values(page1).map(row => {
      const pressureDependentFlow = getPressureDependentFlow(
        pressureIndependentFlowAtMNF,
        minRow,
        row,
        pressureExponentN1
      )
      const pressureIndependentFlow = getPressureIndependentFlow(
        row,
        minRow,
        pressureDependentFlow,
        pressureIndependentFlowAtMNF
      )

      const kFaktorST = getKFaktorST(row)
      const kFaktorKT = getKFaktorKT(row)
      const redukcijaNaVlezenPritisok = getRedukcijaNaVlezenPritisok(row, 30.25)

      return {
        ...row,
        redukcijaNaVlezenPritisok,
        novSredenPritisok: getNovSredenPritisok(
          row,
          redukcijaNaVlezenPritisok,
          pressureDependentFlow,
          pressureIndependentFlow,
          pressureExponentN1,
          kFaktorST,
          30.25
        )
      }
    })
)

export const selectors = {
  page3DataSelector
}

const P3_UPDATE = 'P3_UPDATE'
export const updateAction = (key, val) => ({
  type: P3_UPDATE,
  key,
  val
})

const updateState = (state, { key, val }) => assocPath([key], val, state)

export default (state = defaultState, action) =>
  action.type === P3_UPDATE ? updateState(state, action) : state
