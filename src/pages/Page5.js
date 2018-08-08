import React from 'react'
import Page from '../components/Page'
import PrevNext from '../components/PrevNext'
import { pageTitles } from '../util/constants'

const prev = { to: '/page4', tooltip: pageTitles.page4 }
const next = { to: '/page6', tooltip: pageTitles.page6 }

const Page5 = () => (
  <Page title={pageTitles.page5}>
    <PrevNext prev={prev} next={next}>
      <h1>this is page 5</h1>
    </PrevNext>
  </Page>
)

export default Page5
