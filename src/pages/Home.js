import React from 'react'
import { pageTitles } from '../util/constants'
import Page from '../components/Page'
import styled from 'styled-components'

const Home = () => (
  <Page title={pageTitles.home}>
    <Info>
      Алатка за поддршка на процесот на донесување на одлуки при планирање на
      мерките за контрола на притисокот во водоводната мрежа.
    </Info>
  </Page>
)

export default Home

const Info = styled.h2`
  width: 50%;
  text-align: center;
`
