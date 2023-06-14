import React from 'react'
import T from 'prop-types'

const Flood = ({ children, className }) => <div className={`o-flood ${className}`}>{children}</div>

Flood.propTypes = {
  children: T.node.isRequired,
  className: T.string
}

Flood.defaultProps = {
  className: ''
}

export default Flood
