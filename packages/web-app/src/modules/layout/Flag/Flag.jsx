import React from 'react'
import T from 'prop-types'

const Flag = ({ children, className }) => <div className={`o-flag ${className}`}>{children}</div>

Flag.propTypes = {
  children: T.node.isRequired,
  className: T.string
}

Flag.defaultProps = {
  className: ''
}

export default Flag
