import { path } from 'ramda'
import { createSelector } from 'reselect'
import { selectors as selectors1 } from '../reducers/page1'
import { selectors as selectors2 } from '../reducers/page2'
import { subtract } from 'ramda'
import {
  calculateReductorData,
  calculateReductorSummary
} from '../util/ReductorService'

const page6DataSelector = createSelector(
  [
    selectors2.pressureIndependentFlowAtMNFSelector,
    selectors1.minRowSelector,
    path(['page1']),
    path(['page2', 'pressureExponentN1']),
    path(['page6', 'dozvolenKritichenPritisok']),
    selectors1.maxVlezenPritisokSelector
  ],
  (
    pressureIndependentFlowAtMNF,
    minRow,
    page1,
    pressureExponentN1,
    dozvolenKritichenPritisok,
    maxVlezenPritisok
  ) =>
    Object.values(page1).map(row => {
      let best = {}
      //r == redukcijaNaVlezenPritisok
      for (let r = 0; r < maxVlezenPritisok; r += 0.01) {
        let current = calculateReductorData(
          pressureIndependentFlowAtMNF,
          minRow,
          row,
          pressureExponentN1,
          r
        )
        if (
          !best.novKritichenPritisok ||
          Math.abs(best.novKritichenPritisok - dozvolenKritichenPritisok) >
            Math.abs(current.novKritichenPritisok - dozvolenKritichenPritisok)
        ) {
          best = { ...current, redukcijaNaVlezenPritisok: r }
        }
      }
      return best
    })
)

const sumProtok = state =>
  Object.values(state.page1).reduce(
    (sum, current) => sum + Number(current.protok),
    0
  )

const sumRekalkulaciq = createSelector(
  page6DataSelector,
  data => {
    return data.reduce(
      (sum, current) => sum + Number(current.rekalkulaciqNaVlezniotProtok || 0),
      0
    )
  }
)

const zashtedaVodaM3Selector = createSelector(
  [sumProtok, sumRekalkulaciq],
  subtract
)

const zashtedaVodaPercent = createSelector(
  [sumProtok, sumRekalkulaciq],
  (a, b) => (b === 0 ? 0 : (a / b - 1) * 100)
)

const reductorSummarySelector = createSelector(
  page6DataSelector,
  data => {
    const summary = calculateReductorSummary(data)
    return {
      maxReduciranSredenPritisok5: summary.maxReduciranSredenPritisok,
      maxReduciranKritichenPritisok5: summary.maxReduciranKritichenPritisok,
      sumRekalkulaciqNaVlezniotProtok5: summary.sumRekalkulaciqNaVlezniotProtok
    }
  }
)

export const selectors = {
  page6DataSelector,
  zashtedaVodaM3Selector,
  zashtedaVodaPercent,
  reductorSummarySelector
}

const P6_UPDATE = 'P6_UPDATE'
export const updateAction = val => ({
  type: P6_UPDATE,
  val
})

const updateState = (state, { val }) => ({
  dozvolenKritichenPritisok: val
})

const defaultState = {
  dozvolenKritichenPritisok: ''
}
export default (state = defaultState, action) =>
  action.type === P6_UPDATE ? updateState(state, action) : state
