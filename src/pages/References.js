import React from 'react'
import Page from '../components/Page'
import { pageTitles } from '../util/constants'
import styled from 'styled-components'

const References = () => (

<Page title={pageTitles.references} >
<Info>
<br/>
1. С.Спировска (2019), Докторска дисертација „ Анализа, откривање и намалување на загубите на вода во водоводниот систем на град Скопје“, Универзитет „Св. Кирил и Методиј“, Градежен Факултет - Скопје <br/> <br/>
2. R. Mckenzie (1999) – “SANFLOW, Development of a standardised approach to evaluate burst and background losses in water distribution systems in South Africa”, WRC Report No TT 109/99 <br/> <br/>
3. R. Mckenzie (2001) – “PRESMAC, Pressure Management Program”, WRC Report No TT 152/01 <br/> <br/>
4. R. Mckenzie (2014) – “Guidelines for reducing water losses in South Аfrican municipalities”, WRC Report No TT 595/14, <a href="http://www.wrc.org.za/Knowledge%20Hub%20Documents/Research%20Reports/TT595%20web.pdf" /> <br/> <br/>
5. H.E.Mutikanga, K.Vairavamoorthy,S.K.Sharma, C.S.Akita (2011) – “Operational Tools for Decision Support in Leakage Control”, wpt2011057; DOI:10.2166/wpt.2011.057 <br/> <br/>
6. Vassilis Kanakoudis, Konstantinos Gonelas (2016)- “Non-revenue water reduction through pressure management in Kozani’s water distribution network: from theory to practice“, February 2016 Reserachgate<br/> <br/>
7. Paul V. Fanner, Reinhard Sturm, Julian Thornton, and Roland Liemberger (2007) - “Leakage Management Technologies“, AwwaRF 2007, <a href="http://www.waterrf.org/PublicReportLibrary/91180.pdf" /> <br/> <br/>
8. А. Lambert, Marco Fantozzi, Julian Thornton – “Practical approaches to modeling leakage and pressure management in distribution systems – progress since 2005”, 12th International Conference on Computing and Control for the Water Industry, CCWI2013)<br/> <br/>
9. Zheng Yi Wu (et al.) (2011) - "Water loss reduction", Bentley Institute Press, ISBN: 9781934493083 <br/> <br/>

<br/><br/><br/>
</Info>
</Page>
)
export default References

const Info = styled.div`
  width: 85%;
`
