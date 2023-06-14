import { setLoading, setError, setItems } from '../actions'
import items, { defaultState } from '../reducer'

describe('state/ducks/items/reducer', () => {
  const unknownAction = { type: 'UNKNOWN' }

  it('should return the default state on an unknown action and no state provided', () => {
    expect(items(undefined, unknownAction)).toBe(defaultState)
  })

  it('should return the previous state on an unknown action', () => {
    const previousState = { hello: 'world' }

    expect(items(previousState, unknownAction)).toBe(previousState)
  })

  it("should reset it's state and flag that it's loading on the SET_LOADING action", () => {
    const previousState = {
      items: [{ hello: 'world' }],
      errors: 'error',
      loading: false
    }

    expect(items(previousState, setLoading())).toMatchObject({
      items: [],
      error: null,
      loading: true
    })
  })

  it("should reset it's state and flag an error on the SET_ERROR action", () => {
    const previousState = {
      ...defaultState,
      items: [{ hello: 'world' }],
      errors: null,
      loading: true
    }
    const error = 'An Error'

    expect(items(previousState, setError(error))).toMatchObject({
      ...defaultState,
      error
    })
  })

  it("should reset it's state and set items on the SET_ITEMS action", () => {
    const newItems = [{ hello: 'world' }]
    const previousState = {
      ...defaultState,
      error: 'an error',
      loading: true
    }

    expect(items(previousState, setItems(newItems))).toMatchObject({
      ...defaultState,
      items: newItems,
      loading: false
    })
  })
})
