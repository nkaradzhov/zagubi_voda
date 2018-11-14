import React from 'react'
import WithParentHeight from './WithParentHeight'

const re = /^-?\d+\.?\d*$/
const couldBeNumber = string =>
  string === '-' || string === '' || re.test(string)

const NumberInput = ({ value, onChange, ...rest }) => (
  <WithParentHeight>
    {height => (
      <input
        type="text"
        value={value}
        style={{ lineHeight: `${height}px` }}
        onChange={e => {
          if (couldBeNumber(e.target.value)) {
            onChange && onChange(e.target.value)
          }
        }}
        {...rest}
      />
    )}
  </WithParentHeight>
)

export default NumberInput
