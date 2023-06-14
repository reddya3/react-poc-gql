import React from 'react'
import { mount } from 'enzyme'

import Error from '../Error'

describe('modules/ui/Error', () => {
  const $ = mount(<Error>test</Error>)

  it('should render an error', () => {
    expect($.find('.c-error').exists()).toBe(true)
  })

  it("should render it's children", () => {
    expect($.text()).toBe('test')
  })
})
