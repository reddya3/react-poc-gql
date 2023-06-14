import React from 'react'
import { mount } from 'enzyme'

import WrapperRow from '../WrapperRow'

describe('modules/ui/FixedTable/WrapperRow', () => {
  it('should render the table row', () => {
    const $ = mount(
      <WrapperRow faded highlighted>
        <span id="test" />
      </WrapperRow>
    )
    expect($.find('.c-fixed-table__wrapper-row').exists()).toBe(true)
  })

  it('should apply .highlighted style when highlighted ', () => {
    const $ = mount(
      <WrapperRow highlighted>
        <span id="test" />
      </WrapperRow>
    )
    expect($.find('.highlighted').exists()).toBe(true)
  })

  it('should not apply .highlighted style when not highlighted ', () => {
    const $ = mount(
      <WrapperRow>
        <span id="test" />
      </WrapperRow>
    )
    expect($.find('.highlighted').exists()).toBe(false)
  })

  it('should apply .c-fixed-table--fade when faded', () => {
    const $ = mount(
      <WrapperRow faded>
        <span id="test" />
      </WrapperRow>
    )
    expect($.find('.c-fixed-table--fade').exists()).toBe(true)
  })

  it('should not apply .c-fixed-table--fade when not faded', () => {
    const $ = mount(
      <WrapperRow>
        <span id="test" />
      </WrapperRow>
    )
    expect($.find('.c-fixed-table--fade').exists()).toBe(false)
  })

  it('should render additional classNames', () => {
    const $ = mount(
      <WrapperRow classNames={['section_heading', 'big', 'blue']}>
        <span id="test" />
      </WrapperRow>
    )
    expect($.find('.c-fixed-table__wrapper-row').hasClass('section_heading')).toBe(true)
    expect($.find('.c-fixed-table__wrapper-row').hasClass('big')).toBe(true)
    expect($.find('.c-fixed-table__wrapper-row').hasClass('blue')).toBe(true)
  })

  it('should render standard and additional classNames', () => {
    const $ = mount(
      <WrapperRow highlighted classNames={['section_heading', 'big', 'blue']}>
        <span id="test" />
      </WrapperRow>
    )
    expect($.find('.c-fixed-table__wrapper-row').hasClass('section_heading')).toBe(true)
    expect($.find('.c-fixed-table__wrapper-row').hasClass('big')).toBe(true)
    expect($.find('.c-fixed-table__wrapper-row').hasClass('blue')).toBe(true)
    expect($.find('.c-fixed-table__wrapper-row').hasClass('blue')).toBe(true)
    expect($.find('.c-fixed-table__wrapper-row').hasClass('highlighted')).toBe(true)
    expect($.find('.c-fixed-table__wrapper-row').hasClass('c-fixed-table__wrapper-row')).toBe(true)
  })
})
