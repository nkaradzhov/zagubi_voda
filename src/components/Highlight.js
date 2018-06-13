import React from 'react'

const getClassName = child =>
  child.props.className ? `${child.props.className} highlighted` : 'highlighted'

const Highlight = ({ children }) =>
  React.Children.map(children, child => {
    return React.cloneElement(child, {
      className: getClassName(child)
    })
  })

export default Highlight
