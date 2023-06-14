import React from 'react'
import { mount } from 'enzyme'

import Toolbar from '../Toolbar'

describe('modules/toolbar/Toolbar.header', () => {
  describe('rendering tests', () => {
    const $ = mount(<Toolbar logout={jest.fn()} />)

    it('should display the issue compilation title in the toolbar', () => {
      expect(
        $.find('.c-toolbar-header')
          .text()
          .trim()
      ).toBe('${webapp-name}')
    })

    it('should display the help icon link toolbar', () => {
      expect($.find('button[aria-label="Help"]').prop('title')).toBe('Open Help')
    })

    it('should display the logout button in the toolbar', () => {
      expect($.find('button[aria-label="Log out"]').prop('title')).toBe('Log out')
    })
  })

  describe('functional tests', () => {
    it('should call logout function on click', () => {
      const logoutFn = jest.fn()
      const $ = mount(<Toolbar logout={logoutFn} />)

      const logoutButton = $.find('[aria-label="Log out"]')
      logoutButton.simulate('click')

      expect(logoutFn).toBeCalled()
    })
  })
})
