import React from 'react'
import T from 'prop-types'

import LogoutIcon from '../../assets/icons/logout.svg'

const LogoutButton = ({ logout }) => (
  <button
    aria-label="Log out"
    className="u-soft-left-sm u-soft-right-lg c-icon-button c-icon-button--blue c-icon-button--none"
    onClick={() => logout()}
    title="Log out"
  >
    <LogoutIcon className="c-icon c-icon--sm" />
  </button>
)

LogoutButton.propTypes = {
  logout: T.func.isRequired
}

export default LogoutButton
