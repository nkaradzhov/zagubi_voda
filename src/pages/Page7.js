import React from 'react'
import {
  Grid,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Glyphicon
} from 'react-bootstrap'
import NumberInput from '../components/NumberInput'
import { connect } from 'react-redux'
import { updateAction, selectors } from '../reducers/page7'
import { selectors as selectors4 } from '../reducers/page4'
import { selectors as selectors5 } from '../reducers/page5'
import { selectors as selectors6 } from '../reducers/page6'
import Highlight from '../components/Highlight'
import PrevNext from '../components/PrevNext'
import Page from '../components/Page'
import round from '../util/round'
import { pageTitles } from '../util/constants'

const BigTd = ({ ...rest }) => (
  <td
    style={{
      textAlign: 'left',
      paddingLeft: '0.5em'
    }}
    colSpan={5}
    {...rest}
  />
)
const SmallTd = ({ ...rest }) => <td colSpan={1} {...rest} />
const Highlighted = ({ children, ...rest }) => (
  <Highlight>
    <SmallTd {...rest}>{children}</SmallTd>
  </Highlight>
)

const WithTooltip = ({ id, tooltip, children }) => (
  <OverlayTrigger
    overlay={<Tooltip id={id}>{tooltip}</Tooltip>}
    placement="bottom"
  >
    <BigTd>
      {children}
      <Glyphicon glyph="info-sign" style={{ marginLeft: '1em' }} />
    </BigTd>
  </OverlayTrigger>
)

const prev = { to: '/page6', tooltip: pageTitles.page6 }
const next = { to: '/page8', tooltip: pageTitles.page8 }

const Page7 = ({ data, derived, change }) => (
  <Page title={pageTitles.page7}>
    <Grid>
      <Row>
        <Col lg={10} sm={10} lgOffset={1} smOffset={1}>
          <PrevNext prev={prev} next={next}>
            <table>
              <tbody>
                <tr>
                  <td colSpan={6}>Влезни параметри</td>
                </tr>
                <tr>
                  <WithTooltip
                    id="1"
                    tooltip="Животниот век на редукторот најчесто изнесува 1 декада"
                  >
                    n – број на години поминати од инсталацијата на редукторот
                  </WithTooltip>
                  <SmallTd colSpan={1}>
                    <NumberInput
                      autoFocus
                      value={data.yearOfReductor}
                      onChange={change('yearOfReductor')}
                    />
                  </SmallTd>
                </tr>
                <tr>
                  <BigTd>
                    Р влез – редукција на произведената вода во анализираната
                    зона на потрошувачка при инсталирање на редуктор со фисен
                    излез, m3/ден
                  </BigTd>
                  <Highlighted colSpan={1}>{derived.rsiv1}</Highlighted>
                </tr>
                <tr>
                  <BigTd>
                    Р влез – редукција на произведената вода во анализираната
                    зона на потрошувачка при инсталирање на редуктор модулиран
                    на база на временски интервали, m3/ден
                  </BigTd>
                  <Highlighted colSpan={1}>{derived.rsiv2}</Highlighted>
                </tr>
                <tr>
                  <BigTd>
                    Р влез – редукција на произведената вода во анализираната
                    зона на потрошувачка при инсталирање на редуктор модулиран
                    на база на проток/притисок, m3/ден{' '}
                  </BigTd>
                  <Highlighted colSpan={1}>{derived.rsiv3}</Highlighted>
                </tr>
                <tr>
                  <BigTd>
                    р влез – годишна варијација на влезното количество на вода
                    во системот, %
                  </BigTd>
                  <SmallTd colSpan={1}>
                    <NumberInput
                      value={data.annualSiv}
                      onChange={change('annualSiv')}
                    />
                  </SmallTd>
                </tr>
                <tr>
                  <BigTd>
                    Q влез-годишно количество на влез на вода во анализираната
                    зона на потрошувачка, m3
                  </BigTd>
                  <SmallTd colSpan={1}>
                    <NumberInput value={data.qsiv} onChange={change('qsiv')} />
                  </SmallTd>
                </tr>
                <tr>
                  <BigTd>
                    OME – годишно чинење на електричната енергија за сите
                    процеси во водоснабдувањето во анализираната зона на
                    потрошувачка, мкд
                  </BigTd>
                  <SmallTd colSpan={1}>
                    <NumberInput value={data.ome} onChange={change('ome')} />
                  </SmallTd>
                </tr>
                <tr>
                  <WithTooltip id="1" tooltip="Cmarg (E)=OME/Qsiv">
                    Cmarg(Е) – чинење на електричната енергија за сите процеси
                    во водоснабдувањето во анализираната зона на потрошувачка,
                    мкд/m3
                  </WithTooltip>
                  <Highlighted colSpan={1}>{round(derived.cmarge)}</Highlighted>
                </tr>
                <tr>
                  <BigTd>
                    OMT - годишно чинење на третманот на водата за пиење во
                    анализираната зона на потрошувачка, мкд
                  </BigTd>
                  <SmallTd colSpan={1}>
                    <NumberInput value={data.omt} onChange={change('omt')} />
                  </SmallTd>
                </tr>
                <tr>
                  <WithTooltip id="1" tooltip="Cmarg (T)=OMT/Qsiv">
                    Cmarg(T) - чинење на третманот на водата за пиење во
                    анализираната зона на потрошувачка, мкд/м3{' '}
                  </WithTooltip>
                  <Highlighted colSpan={1}>{round(derived.cmargt)}</Highlighted>
                </tr>
                <tr>
                  <BigTd>rn – годишна инфлација, %</BigTd>
                  <SmallTd colSpan={1}>
                    <NumberInput
                      value={data.annualInflationRate}
                      onChange={change('annualInflationRate')}
                    />
                  </SmallTd>
                </tr>
                <tr>
                  <BigTd>
                    ak - процентуална застапеност на дефекти на приклучоците од
                    вкупниот брoj на дефекти во анализираната зона, %
                  </BigTd>
                  <SmallTd colSpan={1}>
                    <NumberInput value={data.ak} onChange={change('ak')} />
                  </SmallTd>
                </tr>
                <tr>
                  <BigTd>
                    aNк – процентуална застапеност на приклучоците во
                    анализираната зона во однос на вкупниот брoj на приклучоци
                    во водоводниот систем, %
                  </BigTd>
                  <SmallTd colSpan={1}>
                    <NumberInput value={data.ank} onChange={change('ank')} />
                  </SmallTd>
                </tr>
                <tr>
                  <BigTd>
                    ad - процентуална застапеност на дефекти на дистрибутивната
                    мрежа од вкупниот брoj на дефекти во анализираната зона, %
                  </BigTd>
                  <SmallTd colSpan={1}>
                    <NumberInput value={data.ad} onChange={change('ad')} />
                  </SmallTd>
                </tr>
                <tr>
                  <BigTd>
                    aLd - процентуална застапеност на должина на дистрибутивна
                    мрежа во анализираната зона во однос на вкупната должина на
                    брoj на дистрибутивна мрежа во водоводниот систем, %
                  </BigTd>
                  <SmallTd colSpan={1}>
                    <NumberInput value={data.ald} onChange={change('ald')} />
                  </SmallTd>
                </tr>
                <tr>
                  <BigTd>
                    aE&O - фактор кој го одредува % на трошоци за експлоатација
                    и одржување на водоводниот систем потрошени за санирање на
                    дефектите, %
                  </BigTd>
                  <SmallTd colSpan={1}>
                    <NumberInput value={data.aeo} onChange={change('aeo')} />
                  </SmallTd>
                </tr>
                <tr>
                  <BigTd>
                    OME&O - трошоци за експлоатација и одржување на водоводниот
                    систем, вклучувајќи ги сите трошици освен административните,
                    мкд
                  </BigTd>
                  <SmallTd colSpan={1}>
                    <NumberInput value={data.omeo} onChange={change('omeo')} />
                  </SmallTd>
                </tr>
                <tr>
                  <BigTd>
                    aперсонал – фактор кој го одредува импактот на трошоците за
                    вработените во однос на вкупните трошоци (административни
                    трошоци), %
                  </BigTd>
                  <SmallTd colSpan={1}>
                    <NumberInput value={data.aper} onChange={change('aper')} />
                  </SmallTd>
                </tr>
                <tr>
                  <BigTd>
                    OMперсонал - трошоци на вработени при експлоатација и
                    одржување на водоводниот систем, мкд
                  </BigTd>
                  <SmallTd colSpan={1}>
                    <NumberInput
                      value={data.omper}
                      onChange={change('omper')}
                    />
                  </SmallTd>
                </tr>
                <tr>
                  <BigTd>
                    aвоз. – фактор кој го одредува импактот на трошоците за
                    возилата од вкупните трошоци, %
                  </BigTd>
                  <SmallTd colSpan={1}>
                    <NumberInput value={data.avoz} onChange={change('avoz')} />
                  </SmallTd>
                </tr>
                <tr>
                  <BigTd>
                    OМвоз. - трошоци на возилата при експлоатација и одржување
                    на водоводниот систем, мкд
                  </BigTd>
                  <SmallTd colSpan={1}>
                    <NumberInput
                      value={data.omvoz}
                      onChange={change('omvoz')}
                    />
                  </SmallTd>
                </tr>
                <tr>
                  <WithTooltip
                    id="1"
                    tooltip="Во случај кога не постојат конкретни податоци за анализираната зона на потрошувачка се користи вредноста  BFIpr = 3.6, одредена според искуството од веќе реализираните проекти на Балканот		"
                  >
                    BFIpr, коефициент за одредување на редукција на
                    фрекфенцијата на настанување на дефекти на приклучоците како
                    резултат на редуцирањето на работниот притисок
                  </WithTooltip>
                  <SmallTd colSpan={1}>
                    <NumberInput
                      value={data.bflpr}
                      onChange={change('bflpr')}
                    />
                  </SmallTd>
                </tr>
                <tr>
                  <WithTooltip
                    id="1"
                    tooltip="% BFpr = BFIpr x % редукција на мах. ср. притисок во зоната"
                  >
                    BFpr - Редукција на фрекфенцијата на настанување на дефекти
                    на приклучоците поради редуцирањето на работниот притисок со
                    инсталирање на редуктор со фисен излез, %
                  </WithTooltip>
                  <Highlighted colSpan={1}>{round(derived.bfpr1)}</Highlighted>
                </tr>
                <tr>
                  <WithTooltip
                    id="1"
                    tooltip="% BFpr = BFIpr x % редукција на мах. ср. притисок во зоната"
                  >
                    BFpr - Редукција на фрекфенцијата на настанување на дефекти
                    на приклучоците поради редуцирањето на работниот притисок со
                    инсталирање на редуктор модулиран на база на временски
                    интервали, %{' '}
                  </WithTooltip>
                  <Highlighted colSpan={1}>{round(derived.bfpr2)}</Highlighted>
                </tr>
                <tr>
                  <WithTooltip
                    id="1"
                    tooltip="% BFpr = BFIpr x % редукција на мах. ср. притисок во зоната"
                  >
                    BFpr - Редукција на фрекфенцијата на настанување на дефекти
                    на приклучоците поради редуцирањето на работниот притисок со
                    инсталирање на редуктор модулиран на база на
                    проток/притисок, %
                  </WithTooltip>
                  <Highlighted colSpan={1}>{round(derived.bfpr3)}</Highlighted>
                </tr>
                <tr>
                  <WithTooltip
                    id="1"
                    tooltip="Во случај кога не постојат конкретни податоци за анализираната зона на потрошувачка се користи вредноста  BFIdc = 2.95, одредена според искуството од веќе реализираните проекти на Балканот		"
                  >
                    BFIdc, коефициент за одредување на редукција на
                    фрекфенцијата на настанување на дефекти на дистрибитивните
                    цевководи како резултат на редуцирањето на работниот
                    притисок
                  </WithTooltip>
                  <SmallTd colSpan={1}>
                    <NumberInput
                      value={data.bfldc}
                      onChange={change('bfldc')}
                    />
                  </SmallTd>
                </tr>
                <tr>
                  <WithTooltip
                    id="1"
                    tooltip="Објаснување: % BFdc = BFIdc x % редукција на мах. притисок во зоната"
                  >
                    BFdc - Редукција на фрекфенцијата на настанување на дефекти
                    на дистрибутивните цевководи поради редуцирањето на
                    работниот притисок со инсталирање на редуктор со фисен
                    излез, %
                  </WithTooltip>
                  <Highlighted colSpan={1}>{round(derived.bfdc1)}</Highlighted>
                </tr>
                <tr>
                  <WithTooltip
                    id="1"
                    tooltip="Објаснување: % BFdc = BFIdc x % редукција на мах. притисок во зоната"
                  >
                    BFdc - Редукција на фрекфенцијата на настанување на дефекти
                    на дистрибутивните цевководи поради редуцирањето на
                    работниот притисок со инсталирање на редуктор редуктор
                    модулиран на база на временски интервали, %
                  </WithTooltip>
                  <Highlighted colSpan={1}>{round(derived.bfdc2)}</Highlighted>
                </tr>
                <tr>
                  <WithTooltip
                    id="1"
                    tooltip="Објаснување: % BFdc = BFIdc x % редукција на мах. среден притисок во зонатa"
                  >
                    BFdc - Редукција на фрекфенцијата на настанување на дефекти
                    на дистрибутивните цевководи поради редуцирањето на
                    работниот притисок со инсталирање на редуктор модулиран на
                    база на проток/притисок, %
                  </WithTooltip>
                  <Highlighted colSpan={1}>{round(derived.bfdc3)}</Highlighted>
                </tr>
                <tr>
                  <BigTd>
                    Процент на редукција на мах. среден притисокот во зоната при
                    инсталирање на редуктор со фисен излез, %
                  </BigTd>
                  <Highlighted colSpan={1}>
                    {round(derived.reductionMaxPressure1)}
                  </Highlighted>
                </tr>
                <tr>
                  <BigTd>
                    Процент на редукција на мах. среден притисокот во зоната при
                    инсталирање на редуктор модулиран на база на временски
                    интервали, %
                  </BigTd>
                  <Highlighted colSpan={1}>
                    {round(derived.reductionMaxPressure2)}
                  </Highlighted>
                </tr>
                <tr>
                  <BigTd>
                    Процент на редукција на мах. среден притисок во зоната при
                    инсталирање на редуктор модулиран на база на
                    проток/притисок, %
                  </BigTd>
                  <Highlighted colSpan={1}>
                    {round(derived.reductionMaxPressure3)}
                  </Highlighted>
                </tr>
                <tr>
                  <BigTd>
                    Т1 ( Редуктор со фисен излез) – иницијалниот капитал за
                    редукторот и дополнителната опрема; за инсталирање на
                    опремата и годишни трошоци за одржување на опремата, мкд
                  </BigTd>
                  <SmallTd colSpan={1}>
                    <NumberInput
                      value={data.t1fiksen}
                      onChange={change('t1fiksen')}
                    />
                  </SmallTd>
                </tr>
                <tr>
                  <BigTd>
                    Т1 (Редуктор модулиран на база на временски интервали) –
                    иницијалниот капитал за редукторот и дополнителната опрема;
                    за инсталирање на опремата и годишни трошоци за одржување на
                    опремата, мкд
                  </BigTd>
                  <SmallTd colSpan={1}>
                    <NumberInput
                      value={data.t1intervali}
                      onChange={change('t1intervali')}
                    />
                  </SmallTd>
                </tr>
                <tr>
                  <BigTd>
                    Т1 (Редуктор модулиран на база на проток/притисок) –
                    иницијалниот капитал за редукторот и дополнителната опрема;
                    за инсталирање на опремата и годишни трошоци за одржување на
                    опремата, мкд
                  </BigTd>
                  <SmallTd colSpan={1}>
                    <NumberInput
                      value={data.t1protok}
                      onChange={change('t1protok')}
                    />
                  </SmallTd>
                </tr>
                <tr>
                  <BigTd>
                    аPDD – процент на фактурирана потрошувачка која е зависна од
                    работниот притисок во мрежата, %
                  </BigTd>
                  <SmallTd colSpan={1}>
                    <NumberInput value={data.apdd} onChange={change('apdd')} />
                  </SmallTd>
                </tr>
                <tr>
                  <BigTd>
                    Q фак.потр. – годишен волумен на фактурирана вода во
                    анализираната зона на потрошувачка, m3
                  </BigTd>
                  <SmallTd colSpan={1}>
                    <NumberInput value={data.qrw} onChange={change('qrw')} />
                  </SmallTd>
                </tr>
                <tr>
                  <BigTd>Pmarg – маргиналната цена на водата, мкд/m3</BigTd>
                  <SmallTd colSpan={1}>
                    <NumberInput
                      value={data.pmarg}
                      onChange={change('pmarg')}
                    />
                  </SmallTd>
                </tr>

                <tr>
                  <td colSpan={6}>Пресметки</td>
                </tr>
                <tr>
                  <td colSpan={6}>Сценарио 1 - Редуктор со фиксен излез</td>
                </tr>
                <tr>
                  <WithTooltip
                    id="1"
                    tooltip="Објаснување: B1(n)=[Рвлез*(1+рвлез)^n*365*(Cmarg(Е)+Cmarg(T)]*[(1+rn)^n]"
                  >
                    EB1(n) - Годишен економски бенефит од намалените трошоци за
                    електрична енергија за година n, по инсталирање на РП,
                    мкд/год
                  </WithTooltip>
                  <Highlighted colSpan={1}>
                    {round(derived.eb1fiksen)}
                  </Highlighted>
                </tr>
                <tr>
                  <WithTooltip
                    id="1"
                    tooltip="Објаснување: B2(n)= [(aк*aNк) *BFpr +(ad*aLd) *BFdc]* [( aE&O*OME&O)+ (aper.*OMper.)+(avoz.*OMvoz) ]*[(1+rn)^n]"
                  >
                    EB2(n) - годишен економски бенефит од намалените трошоци за
                    експлоатација и одржување на водоводниот систем за година n
                    по инсталирање на РП, мкд/год
                  </WithTooltip>
                  <Highlighted colSpan={1}>
                    {round(derived.eb2fiksen)}
                  </Highlighted>
                </tr>
                <tr>
                  <WithTooltip
                    id="1"
                    tooltip="Објаснување: ЕО1(n) = [T1* [(1+rn)^n]]"
                  >
                    ЕО1(n) - Eкономски одлив поради чинењето на самиот редуктор
                    и дополнителната опрема (вентили, by-pass цевки и сл.),
                    трошоците за неговата инсталација како и трошоците за
                    одржување, мкд/год
                  </WithTooltip>
                  <Highlighted colSpan={1}>
                    {round(derived.eo1fiksen)}
                  </Highlighted>
                </tr>
                <tr>
                  <WithTooltip
                    id="1"
                    tooltip="Објаснување: ЕО2(n)=[аPDD *(Qфак.потр./Qвлез)*Рвлез*(1+рвлез)^n*365*Pmarg]* [(1+rn)^n]"
                  >
                    ЕО2(n) - Економски одлив поради загубата во наплата поради
                    редуцираното влезно количество на вода (зависно од
                    притисокот), мкд/год
                  </WithTooltip>
                  <Highlighted colSpan={1}>
                    {round(derived.eo2fiksen)}
                  </Highlighted>
                </tr>
                <tr>
                  <WithTooltip
                    id="1"
                    tooltip="Објаснување:NPV(n) = [(SEBi(n))- (SEOi(n))]/ [(1+rn)^n]		"
                  >
                    Нето сегашната вредност (НСВ) за година n како резултат на
                    инсталирање на редукторот на притисок во анализираната зона,
                    мкд/год
                  </WithTooltip>
                  <Highlighted colSpan={1}>
                    {round(derived.npvfiksen)}
                  </Highlighted>
                </tr>

                <tr>
                  <td colSpan={6}>
                    Сценарио 2 - Редуктор модулиран на база на временски
                    интервали
                  </td>
                </tr>
                <tr>
                  <WithTooltip
                    id="1"
                    tooltip="Објаснување: B1(n)=[Рвлез*(1+рвлез)^n*365*(Cmarg(Е)+Cmarg(T)]*[(1+rn)^n]"
                  >
                    EB1(n) - Годишен економски бенефит од намалените трошоци за
                    електрична енергија за година n, по инсталирање на РП,
                    мкд/год
                  </WithTooltip>
                  <Highlighted colSpan={1}>
                    {round(derived.eb1interval)}
                  </Highlighted>
                </tr>
                <tr>
                  <WithTooltip
                    id="1"
                    tooltip="Објаснување: B2(n)= [(aк*aNк) *BFpr +(ad*aLd) *BFdc]* [( aE&O*OME&O)+ (aper.*OMper.)+(avoz.*OMvoz) ]*[(1+rn)^n]"
                  >
                    EB2(n) - годишен економски бенефит од намалените трошоци за
                    експлоатација и одржување на водоводниот систем за година n
                    по инсталирање на РП, мкд/год
                  </WithTooltip>
                  <Highlighted colSpan={1}>
                    {round(derived.eb2interval)}
                  </Highlighted>
                </tr>
                <tr>
                  <WithTooltip
                    id="1"
                    tooltip="Објаснување: ЕО1(n) = [T1* [(1+rn)^n]]"
                  >
                    ЕО1(n) - Eкономски одлив поради чинењето на самиот редуктор
                    и дополнителната опрема (вентили, by-pass цевки и сл.),
                    трошоците за неговата инсталација како и трошоците за
                    одржување, мкд/год
                  </WithTooltip>
                  <Highlighted colSpan={1}>
                    {round(derived.eo1interval)}
                  </Highlighted>
                </tr>
                <tr>
                  <WithTooltip
                    id="1"
                    tooltip="Објаснување: ЕО2(n)=[аPDD *(Qфак.потр./Qвлез)*Рвлез*(1+рвлез)^n*365*Pmarg]* [(1+rn)^n]"
                  >
                    ЕО2(n) - Економски одлив поради загубата во наплата поради
                    редуцираното влезно количество на вода (зависно од
                    притисокот), мкд/год
                  </WithTooltip>
                  <Highlighted colSpan={1}>
                    {round(derived.eo2interval)}
                  </Highlighted>
                </tr>
                <tr>
                  <WithTooltip
                    id="1"
                    tooltip="Објаснување:NPV(n) = [(SEBi(n))- (SEOi(n))]/ [(1+rn)^n]		"
                  >
                    Нето сегашната вредност (НСВ) за година n како резултат на
                    инсталирање на редукторот на притисок во анализираната зона,
                    мкд/год
                  </WithTooltip>
                  <Highlighted colSpan={1}>
                    {round(derived.npvinterval)}
                  </Highlighted>
                </tr>

                <tr>
                  <td colSpan={6}>
                    Сценарио 3 - Редуктор модулиран на база на проток/притисок
                  </td>
                </tr>
                <tr>
                  <WithTooltip
                    id="1"
                    tooltip="Објаснување: B1(n)=[Рвлез*(1+рвлез)^n*365*(Cmarg(Е)+Cmarg(T)]*[(1+rn)^n]"
                  >
                    EB1(n) - Годишен економски бенефит од намалените трошоци за
                    електрична енергија за година n, по инсталирање на РП,
                    мкд/год
                  </WithTooltip>
                  <Highlighted colSpan={1}>
                    {round(derived.eb1Protok)}
                  </Highlighted>
                </tr>
                <tr>
                  <WithTooltip
                    id="1"
                    tooltip="Објаснување: B2(n)= [(aк*aNк) *BFpr +(ad*aLd) *BFdc]* [( aE&O*OME&O)+ (aper.*OMper.)+(avoz.*OMvoz) ]*[(1+rn)^n]"
                  >
                    EB2(n) - годишен економски бенефит од намалените трошоци за
                    експлоатација и одржување на водоводниот систем за година n
                    по инсталирање на РП, мкд/год
                  </WithTooltip>
                  <Highlighted colSpan={1}>
                    {round(derived.eb2Protok)}
                  </Highlighted>
                </tr>
                <tr>
                  <WithTooltip
                    id="1"
                    tooltip="Објаснување: ЕО1(n) = [T1* [(1+rn)^n]]"
                  >
                    ЕО1(n) - Eкономски одлив поради чинењето на самиот редуктор
                    и дополнителната опрема (вентили, by-pass цевки и сл.),
                    трошоците за неговата инсталација како и трошоците за
                    одржување, мкд/год
                  </WithTooltip>
                  <Highlighted colSpan={1}>
                    {round(derived.eo1Protok)}
                  </Highlighted>
                </tr>
                <tr>
                  <WithTooltip
                    id="1"
                    tooltip="Објаснување: ЕО2(n)=[аPDD *(Qфак.потр./Qвлез)*Рвлез*(1+рвлез)^n*365*Pmarg]* [(1+rn)^n]"
                  >
                    ЕО2(n) - Економски одлив поради загубата во наплата поради
                    редуцираното влезно количество на вода (зависно од
                    притисокот), мкд/год
                  </WithTooltip>
                  <Highlighted colSpan={1}>
                    {round(derived.eo2Protok)}
                  </Highlighted>
                </tr>
                <tr>
                  <WithTooltip
                    id="1"
                    tooltip="Објаснување:NPV(n) = [(SEBi(n))- (SEOi(n))]/ [(1+rn)^n]		"
                  >
                    Нето сегашната вредност (НСВ) за година n како резултат на
                    инсталирање на редукторот на притисок во анализираната зона
                  </WithTooltip>
                  <Highlighted colSpan={1}>
                    {round(derived.npvProtok)}
                  </Highlighted>
                </tr>
              </tbody>
            </table>
          </PrevNext>
        </Col>
      </Row>
    </Grid>
  </Page>
)

const mstp = state => ({
  data: state.page7,
  derived: {
    cmarge: selectors.cmargeSelector(state),
    cmargt: selectors.cmargtSelector(state),
    reductionMaxPressure1: selectors.reductionMaxPressure1Selector(state),
    reductionMaxPressure2: selectors.reductionMaxPressure2Selector(state),
    reductionMaxPressure3: selectors.reductionMaxPressure3Selector(state),
    bfpr1: selectors.bfpr1Selector(state),
    bfpr2: selectors.bfpr2Selector(state),
    bfpr3: selectors.bfpr3Selector(state),
    bfdc1: selectors.bfdc1Selector(state),
    bfdc2: selectors.bfdc2Selector(state),
    bfdc3: selectors.bfdc3Selector(state),
    rsiv1: selectors4.zashtedaVodaM3Selector(state),
    rsiv2: selectors5.zashtedaVodaM3Selector(state),
    rsiv3: selectors6.zashtedaVodaM3Selector(state),
    eb1fiksen: selectors.eb1fiksenSelector(state),
    eb2fiksen: selectors.eb2fiksenSelector(state),
    eo1fiksen: selectors.eo1fiksenSelector(state),
    eo2fiksen: selectors.eo2fiksenSelector(state),
    npvfiksen: selectors.npvfiksenSelector(state),
    eb1interval: selectors.eb1intervalSelector(state),
    eb2interval: selectors.eb2intervalSelector(state),
    eo1interval: selectors.eo1intervalSelector(state),
    eo2interval: selectors.eo2intervalSelector(state),
    npvinterval: selectors.npvintervalSelector(state),
    eb1Protok: selectors.eb1ProtokSelector(state),
    eb2Protok: selectors.eb2ProtokSelector(state),
    eo1Protok: selectors.eo1ProtokSelector(state),
    eo2Protok: selectors.eo2ProtokSelector(state),
    npvProtok: selectors.npvProtokSelector(state)
  }
})

const mdtp = dispatch => ({
  change: key => val => dispatch(updateAction(key, val))
})

export default connect(
  mstp,
  mdtp
)(Page7)
