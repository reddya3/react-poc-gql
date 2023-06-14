import React from 'react'
import T from 'prop-types'

const Component = ({ children, className }) => <div className={`o-flag__component ${className}`}>{children}</div>

Component.propTypes = {
  children: T.node.isRequired,
  className: T.string
}

Component.defaultProps = {
  className: ''
}

export default Component
