import { path, assocPath } from 'ramda'
import { createSelector } from 'reselect'
import { selectors as selectors1 } from './page1'
import { selectors as selectors4 } from './page4'
import { selectors as selectors5 } from './page5'
import { selectors as selectors6 } from './page6'
const defaultState = {
  yearOfReductor: '',
  annualSiv: '',
  qsiv: '',
  ome: '',
  omt: '',
  annualInflationRate: '',
  ak: '',
  ank: '',
  ad: '',
  ald: '',
  aeo: '',
  omeo: '',
  aper: '',
  omper: '',
  avoz: '',
  omvoz: '',
  bflpr: '3.6',
  bfldc: '2.95',
  t1fiksen: '',
  t1intervali: '',
  t1protok: '',
  apdd: '',
  qrw: '',
  pmarg: ''
}

const cmargeSelector = createSelector(
  [path(['page7', 'ome']), path(['page7', 'qsiv'])],
  (ome, qsiv) => ome / qsiv
)

const cmargtSelector = createSelector(
  [path(['page7', 'omt']), path(['page7', 'qsiv'])],
  (omt, qsiv) => omt / qsiv
)

const maxDefiniranSredenPritisok1Selector = createSelector(
  [selectors4.page4DataSelector],
  data => {
    let max = 0
    for (let row of Object.values(data)) {
      const novSredenPritisok = parseFloat(row.novSredenPritisok, 10)
      if (!isNaN(novSredenPritisok)) {
        if (!max) max = novSredenPritisok
        if (max < novSredenPritisok) max = novSredenPritisok
      }
    }
    return max
  }
)

const maxDefiniranSredenPritisok2Selector = createSelector(
  [selectors5.page5DataSelector],
  data => {
    let max = 0
    for (let row of Object.values(data)) {
      const novSredenPritisok = parseFloat(row.novSredenPritisok, 10)
      if (!isNaN(novSredenPritisok)) {
        if (!max) max = novSredenPritisok
        if (max < novSredenPritisok) max = novSredenPritisok
      }
    }
    return max
  }
)

const maxDefiniranSredenPritisok3Selector = createSelector(
  [selectors6.page6DataSelector],
  data => {
    let max = 0
    for (let row of Object.values(data)) {
      const novSredenPritisok = parseFloat(row.novSredenPritisok, 10)
      if (!isNaN(novSredenPritisok)) {
        if (!max) max = novSredenPritisok
        if (max < novSredenPritisok) max = novSredenPritisok
      }
    }
    return max
  }
)

const reductionMaxPressure1Selector = createSelector(
  [selectors1.maxSredenPritisokSelector, maxDefiniranSredenPritisok1Selector],
  (maxSreden, maxDefiniranSreden) => {
    console.log(maxDefiniranSreden)
    return (1 - maxDefiniranSreden / maxSreden) * 100
  }
)

const reductionMaxPressure2Selector = createSelector(
  [selectors1.maxSredenPritisokSelector, maxDefiniranSredenPritisok2Selector],
  (maxSreden, maxDefiniranSreden) => (1 - maxDefiniranSreden / maxSreden) * 100
)

const reductionMaxPressure3Selector = createSelector(
  [selectors1.maxSredenPritisokSelector, maxDefiniranSredenPritisok3Selector],
  (maxSreden, maxDefiniranSreden) => (1 - maxDefiniranSreden / maxSreden) * 100
)

const bfpr1Selector = createSelector(
  [path(['page7', 'bflpr']), reductionMaxPressure1Selector],
  (bflpr, reductionMaxPressure) => bflpr * reductionMaxPressure
)

const bfpr2Selector = createSelector(
  [path(['page7', 'bflpr']), reductionMaxPressure2Selector],
  (bflpr, reductionMaxPressure) => bflpr * reductionMaxPressure
)

const bfpr3Selector = createSelector(
  [path(['page7', 'bflpr']), reductionMaxPressure3Selector],
  (bflpr, reductionMaxPressure) => bflpr * reductionMaxPressure
)

const bfdc1Selector = createSelector(
  [path(['page7', 'bfldc']), reductionMaxPressure1Selector],
  (bfldc, reductionMaxPressure) => bfldc * reductionMaxPressure
)

const bfdc2Selector = createSelector(
  [path(['page7', 'bfldc']), reductionMaxPressure2Selector],
  (bfldc, reductionMaxPressure) => bfldc * reductionMaxPressure
)

const bfdc3Selector = createSelector(
  [path(['page7', 'bfldc']), reductionMaxPressure3Selector],
  (bfldc, reductionMaxPressure) => bfldc * reductionMaxPressure
)

const eb1fiksenSelector = createSelector(
  [
    selectors4.zashtedaVodaM3Selector,
    path(['page7', 'annualSiv']),
    path(['page7', 'yearOfReductor']),
    cmargeSelector,
    cmargtSelector,
    path(['page7', 'annualInflationRate'])
  ],
  (
    zashtedaVoda,
    annualSiv,
    yearOfReductor,
    cmarge,
    cmargt,
    annualInflationRate
  ) =>
    zashtedaVoda *
    (1 +
      Math.pow(1 + annualSiv / 100, yearOfReductor) *
        365 *
        (cmarge + cmargt) *
        Math.pow(1 + annualInflationRate / 100, yearOfReductor))
)

const eb2fiksenSelector = createSelector(
  [
    path(['page7', 'ak']),
    path(['page7', 'ank']),
    path(['page7', 'ad']),
    path(['page7', 'ald']),
    path(['page7', 'aeo']),
    path(['page7', 'omeo']),
    path(['page7', 'aper']),
    path(['page7', 'omper']),
    path(['page7', 'avoz']),
    path(['page7', 'omvoz']),
    path(['page7', 'yearOfReductor']),
    path(['page7', 'annualInflationRate']),
    bfpr1Selector,
    bfdc1Selector
  ],
  (
    ak,
    ank,
    ad,
    ald,
    aeo,
    omeo,
    aper,
    omper,
    avoz,
    omvoz,
    yearOfReductor,
    annualInflationRate,
    bfpr,
    bfdc
  ) =>
    ((((ak * ank) / 100) * bfpr) / 100 + (((ad * ald) / 100) * bfdc) / 100) *
    ((aeo / 100) * omeo + (aper / 100) * omper + (avoz / 100) * omvoz) *
    Math.pow(1 + annualInflationRate / 100, yearOfReductor)
)

const eo1fiksenSelector = createSelector(
  [
    path(['page7', 't1fiksen']),
    path(['page7', 'yearOfReductor']),
    path(['page7', 'annualInflationRate'])
  ],
  (t1fiksen, yearOfReductor, annualInflationRate) =>
    t1fiksen * Math.pow(1 + annualInflationRate / 100, yearOfReductor)
)

const eo2fiksenSelector = createSelector(
  [
    path(['page7', 'apdd']),
    path(['page7', 'qrw']),
    path(['page7', 'qsiv']),
    selectors4.zashtedaVodaM3Selector,
    path(['page7', 'annualSiv']),
    path(['page7', 'yearOfReductor']),
    path(['page7', 'pmarg']),
    path(['page7', 'annualInflationRate'])
  ],
  (
    apdd,
    qrw,
    qsiv,
    zashtedaVoda,
    annualSiv,
    yearOfReductor,
    pmarg,
    annualInflationRate
  ) =>
    (((apdd / 100) * qrw) / qsiv) *
    zashtedaVoda *
    Math.pow(1 + annualSiv / 100, yearOfReductor) *
    365 *
    pmarg *
    Math.pow(1 + annualInflationRate / 100, yearOfReductor)
)

const npvfiksenSelector = createSelector(
  [
    eb1fiksenSelector,
    eb2fiksenSelector,
    eo1fiksenSelector,
    eo2fiksenSelector,
    path(['page7', 'yearOfReductor']),
    path(['page7', 'annualSiv'])
  ],
  (eb1, eb2, eo1, eo2, yearOfReductor, annualInflationRate) =>
    (eb1 + eb2 - eo1 - eo2) /
    Math.pow(1 + annualInflationRate / 100, yearOfReductor)
)

const eb1intervalSelector = createSelector(
  [
    selectors5.zashtedaVodaM3Selector,
    path(['page7', 'annualSiv']),
    path(['page7', 'yearOfReductor']),
    cmargeSelector,
    cmargtSelector,
    path(['page7', 'annualInflationRate'])
  ],
  (
    zashtedaVoda,
    annualSiv,
    yearOfReductor,
    cmarge,
    cmargt,
    annualInflationRate
  ) =>
    zashtedaVoda *
    Math.pow(1 + annualSiv / 100, yearOfReductor) *
    365 *
    (cmarge + cmargt) *
    Math.pow(1 + annualInflationRate / 100, yearOfReductor)
)

const eb2intervalSelector = createSelector(
  [
    path(['page7', 'ak']),
    path(['page7', 'ank']),
    path(['page7', 'ad']),
    path(['page7', 'ald']),
    path(['page7', 'aeo']),
    path(['page7', 'omeo']),
    path(['page7', 'aper']),
    path(['page7', 'omper']),
    path(['page7', 'avoz']),
    path(['page7', 'omvoz']),
    path(['page7', 'yearOfReductor']),
    path(['page7', 'annualInflationRate']),
    bfpr2Selector,
    bfdc2Selector
  ],
  (
    ak,
    ank,
    ad,
    ald,
    aeo,
    omeo,
    aper,
    omper,
    avoz,
    omvoz,
    yearOfReductor,
    annualInflationRate,
    bfpr,
    bfdc
  ) =>
    ((((ak * ank) / 100) * bfpr) / 100 + (((ad * ald) / 100) * bfdc) / 100) *
    ((aeo / 100) * omeo + (aper / 100) * omper + (avoz / 100) * omvoz) *
    Math.pow(1 + annualInflationRate / 100, yearOfReductor)
)

const eo1intervalSelector = createSelector(
  [
    path(['page7', 't1intervali']),
    path(['page7', 'yearOfReductor']),
    path(['page7', 'annualInflationRate'])
  ],
  (t1fiksen, yearOfReductor, annualInflationRate) =>
    t1fiksen * Math.pow(1 + annualInflationRate / 100, yearOfReductor)
)

const eo2intervalSelector = createSelector(
  [
    path(['page7', 'apdd']),
    path(['page7', 'qrw']),
    path(['page7', 'qsiv']),
    selectors5.zashtedaVodaM3Selector,
    path(['page7', 'annualSiv']),
    path(['page7', 'yearOfReductor']),
    path(['page7', 'pmarg']),
    path(['page7', 'annualInflationRate'])
  ],
  (
    apdd,
    qrw,
    qsiv,
    zashtedaVoda,
    annualSiv,
    yearOfReductor,
    pmarg,
    annualInflationRate
  ) =>
    (((apdd / 100) * qrw) / qsiv) *
    zashtedaVoda *
    Math.pow(1 + annualSiv / 100, yearOfReductor) *
    365 *
    pmarg *
    Math.pow(1 + annualInflationRate / 100, yearOfReductor)
)

const npvintervalSelector = createSelector(
  [
    eb1intervalSelector,
    eb2intervalSelector,
    eo1intervalSelector,
    eo2intervalSelector,
    path(['page7', 'yearOfReductor']),
    path(['page7', 'annualInflationRate'])
  ],
  (eb1, eb2, eo1, eo2, yearOfReductor, annualInflationRate) =>
    (eb1 + eb2 - eo1 - eo2) /
    Math.pow(1 + annualInflationRate / 100, yearOfReductor)
)

const eb1ProtokSelector = createSelector(
  [
    selectors6.zashtedaVodaM3Selector,
    path(['page7', 'annualSiv']),
    path(['page7', 'yearOfReductor']),
    cmargeSelector,
    cmargtSelector,
    path(['page7', 'annualInflationRate'])
  ],
  (
    zashtedaVoda,
    annualSiv,
    yearOfReductor,
    cmarge,
    cmargt,
    annualInflationRate
  ) =>
    zashtedaVoda *
    Math.pow(1 + annualSiv / 100, yearOfReductor) *
    365 *
    (cmarge + cmargt) *
    Math.pow(1 + annualInflationRate / 100, yearOfReductor)
)

const eb2ProtokSelector = createSelector(
  [
    path(['page7', 'ak']),
    path(['page7', 'ank']),
    path(['page7', 'ad']),
    path(['page7', 'ald']),
    path(['page7', 'aeo']),
    path(['page7', 'omeo']),
    path(['page7', 'aper']),
    path(['page7', 'omper']),
    path(['page7', 'avoz']),
    path(['page7', 'omvoz']),
    path(['page7', 'yearOfReductor']),
    path(['page7', 'annualInflationRate']),
    bfpr3Selector,
    bfdc3Selector
  ],
  (
    ak,
    ank,
    ad,
    ald,
    aeo,
    omeo,
    aper,
    omper,
    avoz,
    omvoz,
    yearOfReductor,
    annualInflationRate,
    bfpr,
    bfdc
  ) =>
    ((((ak * ank) / 100) * bfpr) / 100 + (((ad * ald) / 100) * bfdc) / 100) *
    ((aeo / 100) * omeo + (aper / 100) * omper + (avoz / 100) * omvoz) *
    Math.pow(1 + annualInflationRate / 100, yearOfReductor)
)

const eo1ProtokSelector = createSelector(
  [
    path(['page7', 't1protok']),
    path(['page7', 'yearOfReductor']),
    path(['page7', 'annualInflationRate'])
  ],
  (t1fiksen, yearOfReductor, annualInflationRate) =>
    t1fiksen * Math.pow(1 + annualInflationRate / 100, yearOfReductor)
)

const eo2ProtokSelector = createSelector(
  [
    path(['page7', 'apdd']),
    path(['page7', 'qrw']),
    path(['page7', 'qsiv']),
    selectors6.zashtedaVodaM3Selector,
    path(['page7', 'annualSiv']),
    path(['page7', 'yearOfReductor']),
    path(['page7', 'pmarg']),
    path(['page7', 'annualInflationRate'])
  ],
  (
    apdd,
    qrw,
    qsiv,
    zashtedaVoda,
    annualSiv,
    yearOfReductor,
    pmarg,
    annualInflationRate
  ) =>
    (((apdd / 100) * qrw) / qsiv) *
    zashtedaVoda *
    Math.pow(1 + annualSiv / 100, yearOfReductor) *
    365 *
    pmarg *
    Math.pow(1 + annualInflationRate / 100, yearOfReductor)
)

const npvProtokSelector = createSelector(
  [
    eb1ProtokSelector,
    eb2ProtokSelector,
    eo1ProtokSelector,
    eo2ProtokSelector,
    path(['page7', 'yearOfReductor']),
    path(['page7', 'annualInflationRate'])
  ],
  (eb1, eb2, eo1, eo2, yearOfReductor, annualInflationRate) =>
    (eb1 + eb2 - eo1 - eo2) /
    Math.pow(1 + annualInflationRate / 100, yearOfReductor)
)

export const selectors = {
  cmargeSelector,
  cmargtSelector,
  reductionMaxPressure1Selector,
  reductionMaxPressure2Selector,
  reductionMaxPressure3Selector,
  bfpr1Selector,
  bfpr2Selector,
  bfpr3Selector,
  bfdc1Selector,
  bfdc2Selector,
  bfdc3Selector,
  eb1fiksenSelector,
  eb2fiksenSelector,
  eo1fiksenSelector,
  eo2fiksenSelector,
  npvfiksenSelector,
  eb1intervalSelector,
  eb2intervalSelector,
  eo1intervalSelector,
  eo2intervalSelector,
  npvintervalSelector,
  eb1ProtokSelector,
  eb2ProtokSelector,
  eo1ProtokSelector,
  eo2ProtokSelector,
  npvProtokSelector
}

const P6_UPDATE = 'P6_UPDATE'
export const updateAction = (key, val) => ({
  type: P6_UPDATE,
  key,
  val
})

const updateState = (state, { key, val }) => assocPath([key], val, state)

export default (state = defaultState, action) =>
  action.type === P6_UPDATE ? updateState(state, action) : state
