import React from 'react'
import { mount } from 'enzyme'

import LoginForm from '../LoginForm'
import { waitAndUpdate } from '../../../helpers/async'

const ENTER_KEY = 13

const setFieldValue = ($, id, value) => {
  const input = $.find(`#${id}`)
  input.instance().value = value
  input.simulate('change')
}

describe('modules/login/LoginForm', () => {
  describe('intial state verfification', () => {
    const $ = mount(<LoginForm login={jest.fn()} />)
    it('should initialise with disabled login button', () => {
      expect($.find('[aria-label="Sign in"]').prop('disabled')).toBe(true)
    })
    it('should initialise with no field warnings', () => {
      expect($.find('.formFieldError').exists()).toBe(false)
      expect($.find('.c-login-form__loginFailure').exists()).toBe(false)
    })
    it('should initialise with login failure', () => {
      expect($.find('.c-login-form__loginFailure').exists()).toBe(false)
    })
  })

  describe('validation failure verification', () => {
    it('should warn on empty User ID', () => {
      const $ = mount(<LoginForm login={jest.fn()} />)

      $.find('#userId').simulate('blur')

      expect($.find('.formFieldError').exists()).toBe(true)
      expect($.find('.formFieldError').text()).toBe('A user ID must be specified')
      expect($.find('#userId').hasClass('invalid')).toBe(true)
    })

    it('should warn on empty password', () => {
      const $ = mount(<LoginForm login={jest.fn()} />)

      $.find('#password').simulate('blur')

      expect($.find('.formFieldError').exists()).toBe(true)
      expect($.find('.formFieldError').text()).toBe('A password must be specified')
      expect($.find('#password').hasClass('invalid')).toBe(true)
    })

    it('should warn on whitespace only User ID', () => {
      const $ = mount(<LoginForm login={jest.fn()} />)

      setFieldValue($, 'userId', ' \t')

      $.update()

      expect($.find('#userId').hasClass('invalid')).toBe(true)
    })

    it('should warn on whitespace only password', () => {
      const $ = mount(<LoginForm login={jest.fn()} />)

      setFieldValue($, 'password', ' \t')

      expect($.find('#password').hasClass('invalid')).toBe(true)
    })

    it('maintain disable button until valid User ID and password', () => {
      const $ = mount(<LoginForm login={jest.fn()} />)

      setFieldValue($, 'userId', 'user1')

      expect($.find('[aria-label="Sign in"]').prop('disabled')).toBe(true)

      setFieldValue($, 'userId', '')
      setFieldValue($, 'password', 'password')

      expect($.find('[aria-label="Sign in"]').prop('disabled')).toBe(true)

      setFieldValue($, 'userId', 'user1')

      expect($.find('[aria-label="Sign in"]').prop('disabled')).toBe(false)
    })
  })

  describe('verify field navigation', () => {
    it('should move focus to password field on enter on User ID field', () => {
      const $ = mount(<LoginForm login={jest.fn()} />)
      const userIdInputField = $.find('#userId')

      userIdInputField.getDOMNode().focus()

      expect(document.activeElement.id).toBe('userId')

      // verify non-enter keydown behavour
      userIdInputField.prop('onKeyDown')({
        target: userIdInputField.getDOMNode(),
        key: 'u',
        keyCode: 85,
        which: 85,
        preventDefault: jest.fn()
      })

      expect(document.activeElement.id).toBe('userId')

      userIdInputField.prop('onKeyDown')({
        target: userIdInputField.getDOMNode(),
        key: 'Enter',
        keyCode: ENTER_KEY,
        which: ENTER_KEY,
        preventDefault: jest.fn()
      })

      expect(document.activeElement.id).toBe('password')
    })

    it('should click login button on enter on password field', () => {
      const $ = mount(<LoginForm login={jest.fn()} />)
      const passwordField = $.find('#password')
      const loginButton = $.find('button')

      setFieldValue($, 'userId', 'user1')
      setFieldValue($, 'password', 'password')

      const buttonClickHandler = jest.fn()
      loginButton.getDOMNode().click = buttonClickHandler

      // verify non-enter keydown behavour
      passwordField.prop('onKeyDown')({
        target: passwordField.getDOMNode(),
        key: 'p',
        keyCode: 80,
        which: 80,
        preventDefault: jest.fn()
      })

      expect(document.activeElement.id).toBe('password')

      passwordField.prop('onKeyDown')({
        target: passwordField.getDOMNode(),
        key: 'Enter',
        keyCode: ENTER_KEY,
        which: ENTER_KEY,
        preventDefault: jest.fn()
      })

      expect(buttonClickHandler.mock.calls.length).toBe(1)
    })
  })

  describe('verify login behaviour', () => {
    it('should call login function on sign in button click', () => {
      const loginFunction = jest.fn()
      const $ = mount(<LoginForm login={loginFunction} />)

      $.find('button').prop('onClick')()

      expect(loginFunction.mock.calls.length).toBe(1)
    })

    it('should render login failure on login failure property true', () => {
      const $ = mount(<LoginForm login={jest.fn()} loginFailure />)

      expect($.find('.c-login-form__loginFailure').exists()).toBe(true)
      expect($.find('.c-login-form__submit-alert').exists()).toBe(true)
      expect(
        $.find('.c-login-form__loginFailure')
          .first()
          .text()
      ).toContain('Sign in failed.')
      expect(
        $.find('.c-login-form__loginFailure')
          .first()
          .text()
      ).toContain('Incorrect user ID or password.')
    })

    it('should render loading indicator when login submitted then revert on failure', async () => {
      const loginFunction = jest.fn()
      loginFunction.mockReturnValue(false)
      const $ = mount(<LoginForm login={loginFunction} />)

      setFieldValue($, 'userId', 'user1')
      setFieldValue($, 'password', 'password')

      expect($.find('LoadingIndicator').exists()).toBe(false)
      expect($.find('button').text()).toContain('Sign in')

      $.find('button').prop('onClick')()
      $.update()

      expect($.find('LoadingIndicator').exists()).toBe(true)
      expect($.find('button').text()).not.toContain('Sign in')
      expect($.find('[aria-label="Sign in"]').prop('disabled')).toBe(true)

      await waitAndUpdate($)

      expect($.find('LoadingIndicator').exists()).toBe(false)
      expect($.find('button').text()).toContain('Sign in')
      expect($.find('[aria-label="Sign in"]').prop('disabled')).toBe(false)
    })

    it('should render loading indicator and remain loading on success', async () => {
      const loginFunction = jest.fn()
      loginFunction.mockReturnValue(true)
      const $ = mount(<LoginForm login={loginFunction} />)

      setFieldValue($, 'userId', 'user1')
      setFieldValue($, 'password', 'password')

      expect($.find('LoadingIndicator').exists()).toBe(false)

      $.find('button').prop('onClick')()
      $.update()

      expect($.find('LoadingIndicator').exists()).toBe(true)

      await waitAndUpdate($)

      expect($.find('LoadingIndicator').exists()).toBe(true)
      expect($.find('[aria-label="Sign in"]').prop('disabled')).toBe(true)
    })
  })
})
