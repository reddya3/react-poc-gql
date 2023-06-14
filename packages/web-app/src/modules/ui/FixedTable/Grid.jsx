import React from 'react'
import T from 'prop-types'

const Grid = React.forwardRef(({ children }, ref) => (
  <div className="c-fixed-table__grid">
    <div className="c-fixed-table__grid-inner" ref={ref}>
      {children}
    </div>
  </div>
))

Grid.propTypes = {
  children: T.node.isRequired
}

export default Grid
