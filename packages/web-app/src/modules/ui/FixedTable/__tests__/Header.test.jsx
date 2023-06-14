import React from 'react'
import { mount } from 'enzyme'

import Header from '../Header'

describe('modules/ui/FixedTable/Header', () => {
  const $ = mount(
    <Header>
      <span id="test" />
    </Header>
  )

  it('should render the table header', () => {
    expect($.find('.c-fixed-table__header').exists()).toBe(true)
  })

  it("should render it's children", () => {
    expect($.find('#test').exists()).toBe(true)
  })
})
