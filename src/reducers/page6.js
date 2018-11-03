import { path, assocPath } from 'ramda'
import { createSelector } from 'reselect'
import { selectors as selectors1 } from './page1'
import { selectors as selectors3 } from './page3'
import { selectors as selectors4 } from './page4'
import { selectors as selectors5 } from './page5'
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
  aeo:'',
  omeo:'',
  aper:'',
  omper:'',
  avoz:'',
  omvoz:'',
  bflpr:'3.6',
  bfldc:'2.95',
  t1fiksen:'',
  t1intervali:'',
  t1protok:'',
  apdd:'',
  qrw:'',
  pmarg:''
}

const cmargeSelector = createSelector(
  [
    path(['page6', 'ome']),
    path(['page6', 'qsiv']),
  ],
  (ome, qsiv) =>
    ome/qsiv
)

const cmargtSelector = createSelector(
  [
    path(['page6', 'omt']),
    path(['page6', 'qsiv']),
  ],
  (omt, qsiv) =>
    omt/qsiv
)

const maxDefiniranSredenPritisok1Selector = createSelector([selectors3.page3DataSelector],
  data => {let max = 0
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

const maxDefiniranSredenPritisok2Selector = createSelector([selectors4.page4DataSelector],
  data => {let max = 0
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

const maxDefiniranSredenPritisok3Selector = createSelector([selectors5.page5DataSelector],
  data => {let max = 0
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
  [
    selectors1.maxSredenPritisokSelector,
    maxDefiniranSredenPritisok1Selector
  ],
  (maxSreden, maxDefiniranSreden) => {
    console.log(maxDefiniranSreden)
    return  (1-maxDefiniranSreden/maxSreden)*100
  }

)

const reductionMaxPressure2Selector = createSelector(
  [
    selectors1.maxSredenPritisokSelector,
    maxDefiniranSredenPritisok2Selector
  ],
  (maxSreden, maxDefiniranSreden) =>
  (1-maxDefiniranSreden/maxSreden)*100
)

const reductionMaxPressure3Selector = createSelector(
  [
    selectors1.maxSredenPritisokSelector,
    maxDefiniranSredenPritisok3Selector
  ],
  (maxSreden, maxDefiniranSreden) =>
  (1-maxDefiniranSreden/maxSreden)*100
)

const bfpr1Selector = createSelector(
  [
    path(['page6', 'bflpr']),
    reductionMaxPressure1Selector
  ],
  (bflpr, reductionMaxPressure) =>
    bflpr * reductionMaxPressure
)

const bfpr2Selector = createSelector(
  [
    path(['page6', 'bflpr']),
    reductionMaxPressure2Selector
  ],
  (bflpr, reductionMaxPressure) =>
    bflpr * reductionMaxPressure
)

const bfpr3Selector = createSelector(
  [
    path(['page6', 'bflpr']),
    reductionMaxPressure3Selector
  ],
  (bflpr, reductionMaxPressure) =>
    bflpr * reductionMaxPressure
)

const bfdc1Selector = createSelector(
  [
    path(['page6', 'bfldc']),
    reductionMaxPressure1Selector
  ],
  (bfldc, reductionMaxPressure) =>
    bfldc * reductionMaxPressure
)

const bfdc2Selector = createSelector(
  [
    path(['page6', 'bfldc']),
    reductionMaxPressure2Selector
  ],
  (bfldc, reductionMaxPressure) =>
    bfldc * reductionMaxPressure
)

const bfdc3Selector = createSelector(
  [
    path(['page6', 'bfldc']),
    reductionMaxPressure3Selector
  ],
  (bfldc, reductionMaxPressure) =>
    bfldc * reductionMaxPressure
)

const eb1fiksenSelector = createSelector(
  [
    selectors3.zashtedaVodaM3Selector,
    path(['page6', 'annualSiv']),
    path(['page6', 'yearOfReductor']),
    cmargeSelector,
    cmargtSelector,
    path(['page6', 'annualInflationRate'])
  ],
  (zashtedaVoda, annualSiv, yearOfReductor, cmarge, cmargt, annualInflationRate) =>
    zashtedaVoda * (1 + Math.pow(1+annualSiv/100, yearOfReductor) * 365 * (cmarge + cmargt) * Math.pow(1+annualInflationRate/100, yearOfReductor))
)

const eb2fiksenSelector = createSelector(
  [
    path(['page6', 'ak']),
    path(['page6', 'ank']),
    path(['page6', 'ad']),
    path(['page6', 'ald']),
    path(['page6', 'aeo']),
    path(['page6', 'omeo']),
    path(['page6', 'aper']),
    path(['page6', 'omper']),
    path(['page6', 'avoz']),
    path(['page6', 'omvoz']),
    path(['page6', 'yearOfReductor']),
    path(['page6', 'annualInflationRate']),
    bfpr1Selector,
    bfdc1Selector
  ],
  (ak, ank, ad, ald, aeo, omeo, aper, omper, avoz, omvoz, yearOfReductor, annualInflationRate, bfpr, bfdc) =>
    (ak * ank)/100 * bfpr/100 + ((ad * ald)/100 * bfdc/100)*(aeo/100 * omeo + (aper/100*omper) + (avoz/100 * omvoz)) * Math.pow(1+annualInflationRate/100, yearOfReductor)
)

const eo1fiksenSelector = createSelector(
  [
    path(['page6', 't1fiksen']),
    path(['page6', 'yearOfReductor']),
    path(['page6', 'annualInflationRate'])
  ],
  (t1fiksen, yearOfReductor, annualInflationRate) =>
  t1fiksen * Math.pow(1+annualInflationRate/100, yearOfReductor)
)

const eo2fiksenSelector = createSelector(
  [
    path(['page6', 'apdd']),
    path(['page6', 'qrw']),
    path(['page6', 'qsiv']),
    selectors3.zashtedaVodaM3Selector,
    path(['page6', 'annualSiv']),
    path(['page6', 'yearOfReductor']),
    path(['page6', 'pmarg']),
    path(['page6', 'annualInflationRate'])
  ],
  (apdd, qrw, qsiv, zashtedaVoda, annualSiv, yearOfReductor, pmarg, annualInflationRate ) =>
  apdd * (qrw/qsiv) * zashtedaVoda * Math.pow(1+annualSiv/100, yearOfReductor) * 365 * pmarg * Math.pow(1+annualInflationRate/100, yearOfReductor)
)

const npvfiksenSelector = createSelector(
  [
    eb1fiksenSelector,
    eb2fiksenSelector,
    eo1fiksenSelector,
    eo2fiksenSelector,
    path(['page6', 'yearOfReductor']),
    path(['page6', 'annualSiv']),
  ],
  (eb1, eb2, eo1, eo2, yearOfReductor, annualInflationRate ) =>
  (eb1 + eb2 - eo1 - eo2) /  Math.pow(1+annualInflationRate/100, yearOfReductor)
)

const eb1intervalSelector = createSelector(
  [
    selectors4.zashtedaVodaM3Selector,
    path(['page6', 'annualSiv']),
    path(['page6', 'yearOfReductor']),
    cmargeSelector,
    cmargtSelector,
    path(['page6', 'annualInflationRate'])
  ],
  (zashtedaVoda, annualSiv, yearOfReductor, cmarge, cmargt, annualInflationRate) =>
    zashtedaVoda * (1 + Math.pow(1+annualSiv/100, yearOfReductor) * 365 * (cmarge + cmargt) * Math.pow(1+annualInflationRate/100, yearOfReductor))
)

const eb2intervalSelector = createSelector(
  [
    path(['page6', 'ak']),
    path(['page6', 'ank']),
    path(['page6', 'ad']),
    path(['page6', 'ald']),
    path(['page6', 'aeo']),
    path(['page6', 'omeo']),
    path(['page6', 'aper']),
    path(['page6', 'omper']),
    path(['page6', 'avoz']),
    path(['page6', 'omvoz']),
    path(['page6', 'yearOfReductor']),
    path(['page6', 'annualInflationRate']),
    bfpr2Selector,
    bfdc2Selector
  ],
  (ak, ank, ad, ald, aeo, omeo, aper, omper, avoz, omvoz, yearOfReductor, annualInflationRate, bfpr, bfdc) =>
    (ak * ank)/100 * bfpr/100 + ((ad * ald)/100 * bfdc/100)*(aeo/100 * omeo + (aper/100*omper) + (avoz/100 * omvoz)) * Math.pow(1+annualInflationRate/100, yearOfReductor)
)

const eo1intervalSelector = createSelector(
  [
    path(['page6', 't1intervali']),
    path(['page6', 'yearOfReductor']),
    path(['page6', 'annualInflationRate'])
  ],
  (t1fiksen, yearOfReductor, annualInflationRate) =>
  t1fiksen * Math.pow(1+annualInflationRate/100, yearOfReductor)
)

const eo2intervalSelector = createSelector(
  [
    path(['page6', 'apdd']),
    path(['page6', 'qrw']),
    path(['page6', 'qsiv']),
    selectors4.zashtedaVodaM3Selector,
    path(['page6', 'annualSiv']),
    path(['page6', 'yearOfReductor']),
    path(['page6', 'pmarg']),
    path(['page6', 'annualInflationRate'])
  ],
  (apdd, qrw, qsiv, zashtedaVoda, annualSiv, yearOfReductor, pmarg, annualInflationRate ) =>
  apdd * (qrw/qsiv) * zashtedaVoda * Math.pow(1+annualSiv/100, yearOfReductor) * 365 * pmarg * Math.pow(1+annualInflationRate/100, yearOfReductor)
)

const npvintervalSelector = createSelector(
  [
    eb1intervalSelector,
    eb2intervalSelector,
    eo1intervalSelector,
    eo2intervalSelector,
    path(['page6', 'yearOfReductor']),
    path(['page6', 'annualInflationRate']),
  ],
  (eb1, eb2, eo1, eo2, yearOfReductor, annualInflationRate ) =>
  (eb1 + eb2 - eo1 - eo2) /  Math.pow(1+annualInflationRate/100, yearOfReductor)
)

const eb1ProtokSelector = createSelector(
  [
    selectors5.zashtedaVodaM3Selector,
    path(['page6', 'annualSiv']),
    path(['page6', 'yearOfReductor']),
    cmargeSelector,
    cmargtSelector,
    path(['page6', 'annualInflationRate'])
  ],
  (zashtedaVoda, annualSiv, yearOfReductor, cmarge, cmargt, annualInflationRate) =>
    zashtedaVoda * (1 + Math.pow(1+annualSiv/100, yearOfReductor) * 365 * (cmarge + cmargt) * Math.pow(1+annualInflationRate/100, yearOfReductor))
)

const eb2ProtokSelector = createSelector(
  [
    path(['page6', 'ak']),
    path(['page6', 'ank']),
    path(['page6', 'ad']),
    path(['page6', 'ald']),
    path(['page6', 'aeo']),
    path(['page6', 'omeo']),
    path(['page6', 'aper']),
    path(['page6', 'omper']),
    path(['page6', 'avoz']),
    path(['page6', 'omvoz']),
    path(['page6', 'yearOfReductor']),
    path(['page6', 'annualInflationRate']),
    bfpr3Selector,
    bfdc3Selector
  ],
  (ak, ank, ad, ald, aeo, omeo, aper, omper, avoz, omvoz, yearOfReductor, annualInflationRate, bfpr, bfdc) =>
    (ak * ank)/100 * bfpr/100 + ((ad * ald)/100 * bfdc/100)*(aeo/100 * omeo + (aper/100*omper) + (avoz/100 * omvoz)) * Math.pow(1+annualInflationRate/100, yearOfReductor)
)

const eo1ProtokSelector = createSelector(
  [
    path(['page6', 't1protok']),
    path(['page6', 'yearOfReductor']),
    path(['page6', 'annualInflationRate'])
  ],
  (t1fiksen, yearOfReductor, annualInflationRate) =>
  t1fiksen * Math.pow(1+annualInflationRate/100, yearOfReductor)
)

const eo2ProtokSelector = createSelector(
  [
    path(['page6', 'apdd']),
    path(['page6', 'qrw']),
    path(['page6', 'qsiv']),
    selectors5.zashtedaVodaM3Selector,
    path(['page6', 'annualSiv']),
    path(['page6', 'yearOfReductor']),
    path(['page6', 'pmarg']),
    path(['page6', 'annualInflationRate'])
  ],
  (apdd, qrw, qsiv, zashtedaVoda, annualSiv, yearOfReductor, pmarg, annualInflationRate ) =>
  apdd * (qrw/qsiv) * zashtedaVoda * Math.pow(1+annualSiv/100, yearOfReductor) * 365 * pmarg * Math.pow(1+annualInflationRate/100, yearOfReductor)
)

const npvProtokSelector = createSelector(
  [
    eb1ProtokSelector,
    eb2ProtokSelector,
    eo1ProtokSelector,
    eo2ProtokSelector,
    path(['page6', 'yearOfReductor']),
    path(['page6', 'annualInflationRate']),
  ],
  (eb1, eb2, eo1, eo2, yearOfReductor, annualInflationRate ) =>
  (eb1 + eb2 - eo1 - eo2) /  Math.pow(1+annualInflationRate/100, yearOfReductor)
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
