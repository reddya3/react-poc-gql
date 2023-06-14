import React from 'react'
import T from 'prop-types'

const Body = ({ children }) => (
  <div className="c-fixed-table__body" role="rowgroup">
    {children}
  </div>
)

Body.propTypes = {
  children: T.node.isRequired
}

export default Body
