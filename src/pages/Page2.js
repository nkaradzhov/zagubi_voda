import React from 'react'
import { Grid, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import NumberInput from '../components/NumberInput'
import { connect } from 'react-redux'
import { updateAction, selectors } from '../reducers/page2'
import { selectors as selectors1 } from '../reducers/page1'
import Highlight from '../components/Highlight'

import './Page2.css'

const BigTd = ({ ...rest }) => <td className="big" colSpan={5} {...rest} />
const SmallTd = ({ ...rest }) => <td colSpan={1} {...rest} />
const Highlighted = ({ children, ...rest }) => (
  <Highlight>
    <SmallTd {...rest}>{children}</SmallTd>
  </Highlight>
)

const WithTooltip = ({ id, tooltip, ...rest }) => (
  <OverlayTrigger
    overlay={<Tooltip id={id}>{tooltip}</Tooltip>}
    placement="bottom"
  >
    <BigTd {...rest} />
  </OverlayTrigger>
)

const Page2 = ({ data, derived, change }) => (
  <Grid>
    <Row>
      <Col lg={10} sm={10} lgOffset={1} smOffset={1}>
        <table>
          <thead>
            <tr>
              <th colSpan={6}>Влезни Параметри</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6}>
                1.Генерални податоци за зоната на потрошувачка
              </td>
            </tr>
            <tr>
              <BigTd>Должина на мрежата, km</BigTd>
              <SmallTd colSpan={1}>
                <NumberInput
                  value={data.lengthOfMains}
                  onChange={change('lengthOfMains')}
                />
              </SmallTd>
            </tr>
            <tr>
              <BigTd>Број на приклучоци</BigTd>
              <SmallTd colSpan={1}>
                <NumberInput
                  value={data.numberOfConnections}
                  onChange={change('numberOfConnections')}
                />
              </SmallTd>
            </tr>
            <tr>
              <BigTd>Број на домаќинства/имоти</BigTd>
              <SmallTd colSpan={1}>
                <NumberInput
                  value={data.numberOfProperties}
                  onChange={change('numberOfProperties')}
                />
              </SmallTd>
            </tr>
            <tr>
              <BigTd>Број на население</BigTd>
              <Highlighted colSpan={1}>
                {derived.estimatedPopulation || ''}
              </Highlighted>
            </tr>
            <tr>
              <BigTd>
                Средна вредност на ноќниот притисок во мрежата, AZNP (m)
              </BigTd>
              <Highlighted colSpan={1}>
                {derived.averageZoneNightPressure}
              </Highlighted>
            </tr>
            <tr>
              <WithTooltip
                id="1"
                tooltip="се добива од мерените вредности на влезен проток во анализиранта зона"
              >
                Минималната ноќна потрошувачка (измерена), m3/h
              </WithTooltip>
              <Highlighted colSpan={1}>
                {derived.measuredMinimumZoneNightFlow || ''}
              </Highlighted>
            </tr>
            <tr>
              <BigTd>Просечна ноќна потрошувачка на жител л/ лице /час</BigTd>
              <SmallTd colSpan={1}>
                <NumberInput
                  value={data.domesticNightUsePerPerson}
                  onChange={change('domesticNightUsePerPerson')}
                />
              </SmallTd>
            </tr>
            <tr>
              <BigTd>Број на мали потрошувачи од стопанството</BigTd>
              <SmallTd colSpan={1}>
                <NumberInput
                  value={data.numberOfSmallNonDomesticUsers}
                  onChange={change('numberOfSmallNonDomesticUsers')}
                />
              </SmallTd>
            </tr>
            <tr>
              <BigTd>
                Среднa вредност на ноќната потрошувачка на мали потрошувачи од
                стопанството, l/h
              </BigTd>
              <SmallTd colSpan={1}>
                <NumberInput
                  value={data.averageUseOfSmallNonDomesticUsers}
                  onChange={change('averageUseOfSmallNonDomesticUsers')}
                />
              </SmallTd>
            </tr>
            <tr>
              <BigTd>
                Ноќна потрошувачка на големи потрошувачи од стопанството, l/h
              </BigTd>
              <SmallTd colSpan={1}>
                <NumberInput
                  value={data.useByLargeNonDomesticUsers}
                  onChange={change('useByLargeNonDomesticUsers')}
                />
              </SmallTd>
            </tr>
            <tr>
              <td colSpan={6}>2.Предефинирани параметри за загубите на вода</td>
            </tr>

            <tr>
              <WithTooltip
                id="2"
                tooltip="
              Дефекти во позадина на главна мрежа со истекување помало од 0.25 m3/h. Честопати се јавуваат на споевите на цевки или од малите пукнатини  во цевководите, а големината на истекување зависи од состојбата на инфраструктурата и работниот притисок. Препорачана вредност од IWA при работен притисок од 50 м е од 40 l/km/h, ±50% (односно од 20 l/km/h до 60 l/km/h)
              "
              >
                Дефекти во позадина на дистрибутивнa мрежа, l/km/h
              </WithTooltip>
              <SmallTd colSpan={1}>
                <NumberInput
                  value={data.backgroundLossesFromMains}
                  onChange={change('backgroundLossesFromMains')}
                />
              </SmallTd>
            </tr>
            <tr>
              <WithTooltip
                id="3"
                tooltip="Препорачана вредност од IWA при работен притисок од 50 м е од 3 l/ приклучок/h, ±50% (1.5 l/приклучок/h до 4.5 l l/приклучок/h)"
              >
                Дефекти во позадина на приклучоци, l/приклучок/h
              </WithTooltip>
              <SmallTd colSpan={1}>
                <NumberInput
                  value={data.backgroundLossesFromConnections}
                  onChange={change('backgroundLossesFromConnections')}
                />
              </SmallTd>
            </tr>
            <tr>
              <WithTooltip
                id="4"
                tooltip="Препорачана вредност од IWA при работен притисок од 50 м е 1 l /имот/ h, ±50%  0.5 l/имот/h до 1.5 l/имот/h)"
              >
                Дефекти во позадина на инсталации, l/имот/h
              </WithTooltip>
              <SmallTd colSpan={1}>
                <NumberInput
                  value={data.backgroundLossesFromProperties}
                  onChange={change('backgroundLossesFromProperties')}
                />
              </SmallTd>
            </tr>
            <tr>
              <WithTooltip
                id="5"
                tooltip="Експонентот N1 го изразува односот „истекување од дефектите – работен притисок“. Вредноста на експонентот на N1, започнува од 0.50 и достигнува дури и вредност од 2.50, во зависност од материјалот на цевководите како и од доминантен тип на дефекти. Препорачана  вредност на N1 = 1 , која е досега и најчесто користена вредност и се користи за големи мрежи со различни материјали на цевководите. За дефектите со фиксни површини како што се дефектите во металните цевководи се препорачува вредност на  N1 од 0.50, а додека за варијабилни отвори, како што се дефетектите во позадина кај споевите и фитинзите на пластични цевки, ќе изнесува 1.5. Поголемите дефекти во пластичните цевководи може да достигнуваат N1 вредности и до 2.5. "
              >
                Експонент на притисокот, во услови кога дефектите во позадина и
                дефекти во водоводната мрежа се третираат како една компонента
              </WithTooltip>
              <SmallTd colSpan={1}>
                <NumberInput
                  value={data.pressureExponentN1}
                  onChange={change('pressureExponentN1')}
                />
              </SmallTd>
            </tr>
            <tr>
              <WithTooltip
                id="6"
                tooltip="Препорачана вредност од IWA  е 0.5 l/ приклучок/h, ±15% "
              >
                Загуба на вода од приклучоците која е независнa од работниот
                притисок во мрежата, l/приклучок x h
              </WithTooltip>
              <SmallTd colSpan={1}>
                <NumberInput
                  value={data.independentLossesPerConnection}
                  onChange={change('independentLossesPerConnection')}
                />
              </SmallTd>
            </tr>
            <tr>
              <WithTooltip
                id="7"
                tooltip="Препорачана вредност од IWA  е 0.5 l/домаќинство/h , ±50%"
              >
                Загуба на вода од домаќинства/имоти која е независнa од
                работниот притисок во мрежата, l/имот x h
              </WithTooltip>
              <SmallTd colSpan={1}>
                <NumberInput
                  value={data.independentLossesPerProperty}
                  onChange={change('independentLossesPerProperty')}
                />
              </SmallTd>
            </tr>
            <tr>
              <BigTd>
                IWA стандардна вредност за истекувањето од еквивалентен дефект
                при притисок од 50 m, m3/h
              </BigTd>
              <SmallTd colSpan={1}>
                <NumberInput
                  value={data.standardEquivalentServicePipeBurstAt50mPressure}
                  onChange={change(
                    'standardEquivalentServicePipeBurstAt50mPressure'
                  )}
                />
              </SmallTd>
            </tr>
            <tr>
              <WithTooltip
                id="8"
                tooltip="Вкупната легална ноќна потрошувачка на корисниците претставува збир од нормална ноќна потрошувачка на домаќинствата (просечна ноќна потрошувачка на жител х број на население),  потрошувачка на мали потрошувачи од стопанството (среднa вредност на ноќната потрошувачка на мали потрошувачи од стопанството х бројот на мали потрошувачи од стопанството) и потрошувачка на големи потрошувачи од стопанството."
              >
                Вкупна легална ноќна потрошувачка на корисниците, m3/h
              </WithTooltip>
              <Highlighted colSpan={1}>
                {derived.totalNormalNightUse || ''}
              </Highlighted>
            </tr>
            <tr>
              <WithTooltip
                id="9"
                tooltip="Загуби на вода од дефектите во позадина се состои од 3 компоненти:  дефектите во позадина од дистрибутивната мрежа,  приклучоците како и од внатрешните(приватни) инсталации, при што за да добијат реалните вредности на дефектите во позадина од веќе предложените од IWA, се користи фактор за корекција на притисокот( AZNP (m)/50 (m) ) ^ N1, каде за експонентот на притисокот за дефектите од позадина е усвоена вредност N1 = 1.5"
              >
                Загуби на вода од т.н. дефекти во позадина, m3/h
              </WithTooltip>
              <Highlighted colSpan={1}>
                {derived.totalBackgroundLeakegeAtActualPressure || ''}
              </Highlighted>
            </tr>
            <tr>
              <WithTooltip
                id="10"
                tooltip="Вкупната очекувана ноќна потрошувачка  претставува збир од вкупна легална ноќна потрошувачка на корисниците и  загуби на вода од т.н. дефекти во позадина (дефекти во позадина  се сметаат за легитимни загуби затоа што не можат да бидат комплетно елиминирани од било кој систем)"
              >
                Вкупна очекувана ноќна потрошувачка, m3/h
              </WithTooltip>
              <Highlighted colSpan={1}>
                {derived.totalExpectedNightUse || ''}
              </Highlighted>
            </tr>
            <tr>
              <WithTooltip
                id="11"
                tooltip="Неочекувани загуби на вода претставуваат разлика од минималната ноќна потрошувачка и вкупната очекувана ноќна потрошувачка"
              >
                Неочекувани загуби на вода (неоткриени дефекти), m3/h
              </WithTooltip>
              <Highlighted colSpan={1}>
                {derived.unaccountedLeakageForNightFlow || ''}
              </Highlighted>
            </tr>
            <tr>
              <WithTooltip
                id="12"
                tooltip="Очекуван број на дефекти се пресметува како однос помеѓу неочекувани загуби на вода (неоткриени дефекти)  и стандардната вредност за  истекување од еквивалентен дефект, при што се користи фактор за корекција на притисокот( AZNP (m)/50 (м) ) ^ N1, каде за експонентот на притисокот за дефектите од позадина е усвоена вредност N1 = 1.5 "
              >
                Очекуван број на дефекти на цевководите
              </WithTooltip>
              <Highlighted colSpan={1}>
                {derived.expectedNumberOfEquivalentServicePipeBursts || ''}
              </Highlighted>
            </tr>
            <tr>
              <WithTooltip
                id="13"
                tooltip="Минималната ноќна потрошувачка независни од работниот притисок се одредуваат како збир од легалната ноќна потрошувачка, производот од загуба на вода од приклучоците која е независнa од работниот притисок во мрежата и бројот на приклучоци и производот од загуба на вода од домаќинства/имоти која е независнa од работниот притисок во мрежата и дројот на домаќинства"
              >
                Истекување од дефекти независни од работниот притисок во
                мрежата, m3/h
              </WithTooltip>
              <Highlighted colSpan={1}>
                {derived.pressureIndependentFlowAtMNF || ''}
              </Highlighted>
            </tr>
            <tr>
              <WithTooltip
                id="14"
                tooltip="Минималната ноќна потрошувачка зависни од работниот притисок се одредуваат со одземање на независната компонента од минималната ноќна потрошувачка"
              >
                Истекување од дефекти зависни од работниот притисок во мрежата,
                m3/h
              </WithTooltip>
              <Highlighted colSpan={1}>
                {derived.pressureDependentFlowAtMNF || ''}
              </Highlighted>
            </tr>
          </tbody>
        </table>
      </Col>
    </Row>
  </Grid>
)

const mstp = state => ({
  data: state.page2,
  derived: {
    estimatedPopulation: selectors.estimatedPopulationSelector(state),
    totalNormalNightUse: selectors.totalNormalNightUseSelector(state),
    measuredMinimumZoneNightFlow: selectors1.minProtokSelector(state),
    averageZoneNightPressure: selectors1.minSredenSelector(state),
    totalBackgroundLeakegeAtActualPressure: selectors.totalBackgroundLeakegeAtActualPressureSelector(
      state
    ),
    totalExpectedNightUse: selectors.totalExpectedNightUseSelector(state),
    unaccountedLeakageForNightFlow: selectors.unaccountedLeakageForNightFlowSelector(
      state
    ),
    expectedNumberOfEquivalentServicePipeBursts: selectors.expectedNumberOfEquivalentServicePipeBurstsSelector(
      state
    ),
    pressureDependentFlowAtMNF: selectors.pressureDependentFlowAtMNFSelector(
      state
    ),
    pressureIndependentFlowAtMNF: selectors.pressureIndependentFlowAtMNFSelector(
      state
    )
  }
})

const mdtp = dispatch => ({
  change: key => val => dispatch(updateAction(key, val))
})

export default connect(
  mstp,
  mdtp
)(Page2)
