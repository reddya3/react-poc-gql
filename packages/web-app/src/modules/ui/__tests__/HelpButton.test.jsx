import React from 'react'
import { mount } from 'enzyme'

import HelpButton from '../HelpButton'

describe('modules/ui/HelpButton', () => {
  it('should render button with color', async () => {
    const $ = mount(<HelpButton color="blue" />)

    expect($.html().includes('class="c-icon-button c-icon-button--blue c-icon-button--none"')).toBe(true)
  })
})
