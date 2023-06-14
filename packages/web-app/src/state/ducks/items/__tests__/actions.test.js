import { setItems, SET_ITEMS, setError, SET_ERROR, setLoading, SET_LOADING } from '../actions'

describe('state/ducks/items/actions', () => {
  describe('setItems', () => {
    it('should create a SET_ITEMS action', () => {
      const items = [{ hello: 'world' }]
      expect(setItems(items)).toMatchObject({
        type: SET_ITEMS,
        payload: {
          items
        }
      })
    })
  })

  describe('setError', () => {
    it('should create a SET_ERROR action', () => {
      const error = 'any error'
      expect(setError(error)).toMatchObject({
        type: SET_ERROR,
        payload: {
          error
        }
      })
    })
  })

  describe('setLoading', () => {
    it('should create a SET_LOADING action', () => {
      expect(setLoading()).toMatchObject({
        type: SET_LOADING
      })
    })
  })
})
