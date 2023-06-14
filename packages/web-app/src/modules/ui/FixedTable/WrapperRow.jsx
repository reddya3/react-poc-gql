import React from 'react'
import T from 'prop-types'

const WrapperRow = ({ children, faded, highlighted, classNames }) => (
  // eslint-disable-next-line jsx-a11y/interactive-supports-focus
  <div
    className={`c-fixed-table__wrapper-row ${highlighted ? 'highlighted' : ''} ${faded ? 'c-fixed-table--fade' : ''} ${
      classNames ? classNames.join(' ') : ''
    }`}
    role="row"
  >
    {children}
  </div>
)

WrapperRow.propTypes = {
  children: T.node.isRequired,
  faded: T.bool,
  highlighted: T.bool,
  classNames: T.arrayOf(T.string)
}

WrapperRow.defaultProps = {
  faded: false,
  highlighted: false,
  classNames: []
}

export default WrapperRow
