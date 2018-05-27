import { path, assocPath } from "ramda";
import { createSelector } from "reselect";
import { getMinRow } from "./page1";

const defaultState = {
  lengthOfMains: "",
  numberOfConnections: "",
  numberOfProperties: "",
  averageZoneNightPressure: "",
  measuredMinimumZoneNightFlow: "",
  domesticNightUsePerPerson: 2,
  numberOfSmallNonDomesticUsers: "",
  averageUseOfSmallNonDomesticUsers: "",
  useByLargeNonDomesticUsers: "",
  backgroundLossesFromMains: 40,
  backgroundLossesFromConnections: 3,
  backgroundLossesFromProperties: 1,
  pressureExponentN1: 1,
  independentLossesPerConnection: 0.5,
  independentLossesPerProperty: 0.5,
  standardEquivalentServicePipeBurstAt50mPressure: 1.6,
  totalExpectedNightUse: "",
  unaccountedLeakageForNightFlow: "",
  expectedNumberOfEquivalentServicePipeBursts: "",
  pressureIndependentFlowAtMNF: "",
  pressureDependentFlowAtMNF: ""
};

const estimatedPopulationSelector = createSelector(
  path(["page2", "numberOfProperties"]),
  n => n * 4
);

const totalNormalNightUseSelector = createSelector(
  [
    path(["page2", "domesticNightUsePerPerson"]),
    estimatedPopulationSelector,
    path(["page2", "numberOfSmallNonDomesticUsers"]),
    path(["page2", "averageUseOfSmallNonDomesticUsers"]),
    path(["page2", "useByLargeNonDomesticUsers"])
  ],
  (night, population, small, avg, large) =>
    (night * population / 1000 + small * avg / 1000 + large / 1000).toFixed(2)
);

const totalBackgroundLeakegeAtActualPressureSelector = createSelector(
  [
    path(["page2", "lengthOfMains"]),
    path(["page2", "backgroundLossesFromMains"]),
    path(["page2", "numberOfConnections"]),
    path(["page2", "backgroundLossesFromConnections"]),
    path(["page2", "numberOfProperties"]),
    path(["page2", "backgroundLossesFromProperties"]),
    state => getMinRow(state).sreden
  ],
  (
    lengthOfMains,
    backgroundLossesFromMains,
    numberOfConnections,
    backgroundLossesFromConnections,
    numberOfProperties,
    backgroundLossesFromProperties,
    averageZoneNightPressure
  ) =>
    (
      lengthOfMains * backgroundLossesFromMains / 1000 +
      numberOfConnections * backgroundLossesFromConnections / 1000 +
      numberOfProperties *
        backgroundLossesFromProperties /
        1000 *
        Math.pow(averageZoneNightPressure / 50, 1.5)
    ).toFixed(2)
);

export const selectors = {
  estimatedPopulationSelector,
  totalNormalNightUseSelector,
  totalBackgroundLeakegeAtActualPressureSelector
};

const P2_UPDATE = "P2_UPDATE";
export const updateAction = (key, val) => ({
  type: P2_UPDATE,
  key,
  val
});

const updateState = (state, { key, val }) => assocPath([key], val, state);

export default (state = defaultState, action) =>
  action.type === P2_UPDATE ? updateState(state, action) : state;
