import React from 'react'
import T from 'prop-types'

import HelpIcon from '../../assets/icons/help.svg'
import config from '../../../config'

const HelpButton = ({ color }) => {
  const onClick = () => window.open(config.webApp.helpUrl, '_blank')
  const className = `c-icon-button c-icon-button--${color} c-icon-button--none`
  return (
    <div className="u-soft-left-sm">
      <button aria-label="Help" className={className} onClick={onClick} title="Open Help">
        <HelpIcon className="c-icon c-icon--xl" />
      </button>
    </div>
  )
}

HelpButton.propTypes = {
  color: T.string.isRequired
}

export default HelpButton
