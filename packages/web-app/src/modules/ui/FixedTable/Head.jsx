import React from 'react'
import T from 'prop-types'

const Head = ({ children }) => (
  <div className="c-fixed-table__head" role="rowgroup">
    {children}
  </div>
)

Head.propTypes = {
  children: T.node.isRequired
}

export default Head
