import React from 'react'
import T from 'prop-types'

import { Flag } from '../layout'
import HelpButton from '../ui/HelpButton'
import LogoutButton from '../ui/LogoutButton'

const Toolbar = ({ logout }) => (
  <div className="c-toolbar">
    <Flag.Flag className="u-fill-height">
      <Flag.Body>
        <div className="c-toolbar-header">
          <h2 className="c-toolbar-header__text">${webapp - name}</h2>
        </div>
      </Flag.Body>
      <Flag.Component className="u-text-right">
        <HelpButton color="blue" />
      </Flag.Component>
      <Flag.Component className="u-text-right">
        <LogoutButton logout={logout} />
      </Flag.Component>
    </Flag.Flag>
  </div>
)

Toolbar.propTypes = {
  logout: T.func.isRequired
}

export default Toolbar
