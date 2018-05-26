import { path, assocPath } from 'ramda'
import { createSelector } from 'reselect'

const defaultState = {
  lengthOfMains: '',
  numberOfConnections: '',
  numberOfProperties: '',
  domesticNightUsePerPerson: 2,
  numberOfSmallNonDomesticUsers: '',
  averageUseOfSmallNonDomesticUsers: '',
  useByLargeNonDomesticUsers: '',
  backgroundLossesFromMains: 40,
  backgroundLossesFromConnections: 3,
  backgroundLossesFromProperties: 1,
  pressureExponentN1: 1,
  independentLossesPerConnection: 0.5,
  independentLossesPerProperty: 0.5,
  standardEquivalentServicePipeBurstAt50mPressure: 1.6,
  totalBackgroundLeakegeAtActualPressure: '',
  totalExpectedNightUse: '',
  unaccountedLeakageForNightFlow: '',
  expectedNumberOfEquivalentServicePipeBursts: '',
  pressureIndependentFlowAtMNF: '',
  pressureDependentFlowAtMNF: ''
}

const estimatedPopulationSelector = createSelector(
  path(['page2', 'numberOfProperties']),
  n => n * 4
)

const totalNormalNightUseSelector = createSelector(
  [
    path(['page2', 'domesticNightUsePerPerson']),
    estimatedPopulationSelector,
    path(['page2', 'numberOfSmallNonDomesticUsers']),
    path(['page2', 'averageUseOfSmallNonDomesticUsers']),
    path(['page2', 'useByLargeNonDomesticUsers'])
  ],
  (night, population, small, avg, large) =>
    parseFloat(
      (night * population / 1000 + small * avg / 1000 + large / 1000).toFixed(2)
    )
)

export const selectors = {
  estimatedPopulationSelector,
  totalNormalNightUseSelector
}

const P2_UPDATE = 'P2_UPDATE'
export const updateAction = (key, val) => ({
  type: P2_UPDATE,
  key,
  val
})

const updateState = (state, { key, val }) => assocPath([key], val, state)

export default (state = defaultState, action) =>
  action.type === P2_UPDATE ? updateState(state, action) : state
