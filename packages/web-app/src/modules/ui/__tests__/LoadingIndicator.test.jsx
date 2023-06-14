import React from 'react'
import { mount } from 'enzyme'

import LoadingIndicator from '../LoadingIndicator'

describe('modules/ui/LoadingIndicator', () => {
  const $ = mount(<LoadingIndicator>test</LoadingIndicator>)

  it('should render a loading indicator', () => {
    expect($.find('.c-loading-indicator').exists()).toBe(true)
  })
})
