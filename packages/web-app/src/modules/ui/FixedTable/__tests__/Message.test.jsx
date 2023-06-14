import React from 'react'
import { mount } from 'enzyme'

import Message from '../Message'

describe('modules/ui/FixedTable/Message', () => {
  const $ = mount(<Message>test</Message>)

  it('should render the table message', () => {
    expect($.find('.c-fixed-table__message').exists()).toBe(true)
  })

  it("should render it's children", () => {
    expect($.html().includes('test')).toBe(true)
  })
})
