export const SET_LOADING = 'web-app/items/SET_LOADING'
export const SET_ITEMS = 'web-app/items/SET_ITEMS'
export const SET_ERROR = 'web-app/items/SET_ERROR'

export const setLoading = () => ({
  type: SET_LOADING
})

export const setItems = items => ({
  payload: { items },
  type: SET_ITEMS
})

export const setError = error => ({
  payload: { error },
  type: SET_ERROR
})
