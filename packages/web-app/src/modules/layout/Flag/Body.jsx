import React from 'react'
import T from 'prop-types'

const Body = ({ children, className }) => <div className={`o-flag__body ${className}`}>{children}</div>

Body.propTypes = {
  children: T.node.isRequired,
  className: T.string
}

Body.defaultProps = {
  className: ''
}

export default Body
