import React from 'react'
import T from 'prop-types'

const Row = ({ children, expanded, bordered, onDoubleClick }) => (
  // eslint-disable-next-line jsx-a11y/interactive-supports-focus
  <div
    className={`c-fixed-table__row  ${expanded ? 'expanded' : ''} ${bordered ? 'bordered' : ''}`}
    role="row"
    onDoubleClick={onDoubleClick}
  >
    {children}
  </div>
)

Row.propTypes = {
  children: T.node.isRequired,
  onDoubleClick: T.func,
  expanded: T.bool,
  bordered: T.bool
}

Row.defaultProps = {
  expanded: false,
  bordered: false,
  onDoubleClick: () => {}
}

export default Row
