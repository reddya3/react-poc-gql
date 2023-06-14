import React from 'react'
import { mount } from 'enzyme'

import Head from '../Head'

describe('modules/ui/FixedTable/Head', () => {
  const $ = mount(
    <Head>
      <span id="test" />
    </Head>
  )

  it('should render the table head', () => {
    expect($.find('.c-fixed-table__head').exists()).toBe(true)
  })

  it("should render it's children", () => {
    expect($.find('#test').exists()).toBe(true)
  })
})
