import { path } from 'ramda'
import { createSelector } from 'reselect'
import { selectors as selectors1 } from '../reducers/page1'
import { selectors as selectors2 } from '../reducers/page2'
import { subtract } from 'ramda'

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

const getKFaktorST = row => (row.vlezen - row.sreden) / Math.pow(row.protok, 2)

const getKFaktorKT = row =>
  (row.vlezen - row.kritichen) / Math.pow(row.protok, 2)

const getReduciranVlezenPritisok = (row, redukcijaNaVlezenPritisok) =>
  row.vlezen - redukcijaNaVlezenPritisok

const getRekalkulaciqNaVlezniotProtok = (
  _l,
  _pressureDependentFlow,
  _sreden,
  _pressureExponentN1,
  _pressureIndependentFlow
) => {
  const l = _l || 0
  const pressureDependentFlow = _pressureDependentFlow || 0
  const sreden = _sreden || 0
  const pressureExponentN1 = _pressureExponentN1 || 0
  const pressureIndependentFlow = _pressureIndependentFlow || 0
  let m = pressureDependentFlow * Math.pow(l / sreden, pressureExponentN1)
  return m + pressureIndependentFlow
}

const getNovSredenPritisok = (
  row,
  redukcijaNaVlezenPritisok,
  pressureDependentFlow,
  pressureIndependentFlow,
  pressureExponentN1,
  kFaktorST,
  reduciranVlezenPritisok
) => {
  let star = 0
  let nov = 0
  do {
    star = nov
    let l = star === 0 ? row.sreden - redukcijaNaVlezenPritisok : star
    let n = getRekalkulaciqNaVlezniotProtok(
      l,
      pressureDependentFlow,
      row.sreden,
      pressureExponentN1,
      pressureIndependentFlow
    )
    let o = kFaktorST * Math.pow(n, 2)
    nov = reduciranVlezenPritisok - o
  } while (Math.abs(star - nov) >= 0.0001)

  return nov
}

const getNovKritichenPritisok = (
  reduciranVlezenPritisok,
  kFaktorKT,
  rekalkulaciqNaVlezniotProtok
) =>
  reduciranVlezenPritisok -
  kFaktorKT * Math.pow(rekalkulaciqNaVlezniotProtok, 2)

const redukcijaNaVlezenPritisokSelector = createSelector(
  path(['page3']),
  state => state.redukcijaNaVlezenPritisok
)

const page3DataSelector = createSelector(
  [
    selectors2.pressureIndependentFlowAtMNFSelector,
    selectors1.minRowSelector,
    path(['page1']),
    path(['page2', 'pressureExponentN1']),
    redukcijaNaVlezenPritisokSelector
  ],
  (
    pressureIndependentFlowAtMNF,
    minRow,
    page1,
    pressureExponentN1,
    redukcijaNaVlezenPritisok
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
      const reduciranVlezenPritisok = getReduciranVlezenPritisok(
        row,
        redukcijaNaVlezenPritisok
      )

      const novSredenPritisok = getNovSredenPritisok(
        row,
        redukcijaNaVlezenPritisok,
        pressureDependentFlow,
        pressureIndependentFlow,
        pressureExponentN1,
        kFaktorST,
        reduciranVlezenPritisok
      )
      const rekalkulaciqNaVlezniotProtok = getRekalkulaciqNaVlezniotProtok(
        row.sreden - redukcijaNaVlezenPritisok,
        pressureDependentFlow,
        row.sreden,
        pressureExponentN1,
        pressureIndependentFlow
      )
      const novKritichenPritisok = getNovKritichenPritisok(
        reduciranVlezenPritisok,
        kFaktorKT,
        rekalkulaciqNaVlezniotProtok
      )

      return {
        ...row,
        reduciranVlezenPritisok,
        novSredenPritisok,
        rekalkulaciqNaVlezniotProtok,
        novKritichenPritisok
      }
    })
)

const sumProtok = state =>
  Object.values(state.page1).reduce(
    (sum, current) => sum + Number(current.protok),
    0
  )

const sumRekalkulaciq = createSelector(page3DataSelector, data =>
  data.reduce(
    (sum, current) => sum + Number(current.rekalkulaciqNaVlezniotProtok || 0),
    0
  )
)

const zashtedaVodaM3Selector = createSelector(
  [sumProtok, sumRekalkulaciq],
  subtract
)

const zashtedaVodaPercent = createSelector(
  [sumProtok, sumRekalkulaciq],
  (a, b) => (b === 0 ? 0 : (a / b - 1) * 100)
)

export const selectors = {
  redukcijaNaVlezenPritisokSelector,
  page3DataSelector,
  zashtedaVodaM3Selector,
  zashtedaVodaPercent
}

const P3_UPDATE = 'P3_UPDATE'
export const updateAction = val => ({
  type: P3_UPDATE,
  val
})

const updateState = (state, { val }) => ({
  redukcijaNaVlezenPritisok: val
})

const defaultState = {
  redukcijaNaVlezenPritisok: ''
}
export default (state = defaultState, action) =>
  action.type === P3_UPDATE ? updateState(state, action) : state
