import React from 'react'
import T from 'prop-types'

const HoverContent = ({ children }) => <div className="c-fixed-table__hover-content">{children}</div>

HoverContent.propTypes = {
  children: T.node.isRequired
}

export default HoverContent
