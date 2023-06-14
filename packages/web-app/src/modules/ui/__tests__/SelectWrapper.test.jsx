import React from 'react'
import { mount } from 'enzyme'
import Select from 'react-select'
import SelectWrapper from '../SelectWrapper'

describe('modules/ui/select/SelectWrapper', () => {
  describe('rendering a react-select when using the SelectWrapper', () => {
    const props = {
      id: 'testSelectId',
      name: 'testSelectName',
      onChange: jest.fn(),
      onInput: jest.fn(),
      onBlur: jest.fn()
    }

    const $ = mount(<SelectWrapper {...props} />)

    it('should render the select with correct properties', () => {
      const TestSelect = $.find(Select)
      expect(TestSelect.props().id).toEqual('testSelectId')
      expect(TestSelect.props().name).toEqual('testSelectName')
      expect(TestSelect.props().onChange).toEqual(props.onChange)
      expect(TestSelect.props().onInput).toEqual(props.onInput)

      // The onBlur function passed to the Select may be different
      expect(TestSelect.props().onBlur).toBeDefined()
      expect(TestSelect.props().onBlur).not.toEqual(props.onBlur)
    })
  })
})
