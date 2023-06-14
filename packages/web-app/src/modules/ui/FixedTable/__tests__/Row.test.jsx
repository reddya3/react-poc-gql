import React from 'react'
import { mount } from 'enzyme'

import Row from '../Row'

describe('modules/ui/FixedTable/Row', () => {
  it('should render the table row', () => {
    const $ = mount(
      <Row>
        <span id="test" />
      </Row>
    )
    expect($.find('.c-fixed-table__row').exists()).toBe(true)
  })

  it('should apply .expanded when expanded', () => {
    const $ = mount(
      <Row expanded>
        <span id="test" />
      </Row>
    )
    expect($.find('.expanded').exists()).toBe(true)
  })

  it('should not apply .expanded when not expanded', () => {
    const $ = mount(
      <Row>
        <span id="test" />
      </Row>
    )
    expect($.find('.expanded').exists()).toBe(false)
  })

  it('should apply .bordered when bordered', () => {
    const $ = mount(
      <Row bordered>
        <span id="test" />
      </Row>
    )
    expect($.find('.bordered').exists()).toBe(true)
  })

  it('should not apply .bordered when not bordered', () => {
    const $ = mount(
      <Row>
        <span id="test" />
      </Row>
    )
    expect($.find('.bordered').exists()).toBe(false)
  })

  it('should pass the double click function to the internal rendering', () => {
    const doubleClickMock = jest.fn()
    const $ = mount(
      <Row onDoubleClick={doubleClickMock}>
        <span id="test" />
      </Row>
    )
    expect($.find('.c-fixed-table__row').props().onDoubleClick).toBe(doubleClickMock)
  })

  it('should use default function if the double click function is not defined', () => {
    const $ = mount(
      <Row>
        <span id="test" />
      </Row>
    )
    expect($.find('.c-fixed-table__row').props().onDoubleClick).toEqual(Row.defaultProps.onDoubleClick)
  })
})
