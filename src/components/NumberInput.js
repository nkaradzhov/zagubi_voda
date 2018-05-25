import React from 'react'

const NumberInput = ({ value, onChange, ...rest }) => (
  <input
    type="text"
    value={value}
    onChange={e => {
      e.target.value === '-' && onChange(e.target.value)
      const val = parseInt(e.target.value, 10)
      !isNaN(val) && onChange(val)
    }}
    {...rest}
  />
)

export default NumberInput
