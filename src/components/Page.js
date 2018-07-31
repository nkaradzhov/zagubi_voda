import React, { Fragment } from 'react'
import styled from 'styled-components'

const Page = ({ title, children }) => (
  <Fragment>
    <Title>{title}</Title>
    <Content>{children}</Content>
  </Fragment>
)

export default Page

const Title = styled.h1`
  text-align: center;
  margin: 20px 0;
`

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
