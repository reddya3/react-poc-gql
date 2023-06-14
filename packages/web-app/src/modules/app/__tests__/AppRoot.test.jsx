import React from 'react'
import { shallow } from 'enzyme'

import AppRoot from '../AppRoot'

describe('modules/app/AppRoot', () => {
  it('should render without crashing', () => {
    shallow(<AppRoot />)
  })
})
