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

const calculateReductorData = (
  pressureIndependentFlowAtMNF,
  minRow,
  row,
  pressureExponentN1,
  redukcijaNaVlezenPritisok
) => {
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
}

export default calculateReductorData
