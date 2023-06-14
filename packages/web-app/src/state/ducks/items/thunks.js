import config from '../../../../config'
import { getItems } from '../../../api/items'
import { setItems, setError, setLoading } from './actions'

export const load = () => async dispatch => {
  dispatch(setLoading())
  try {
    const items = await getItems(config.bff.api.path)()
    dispatch(setItems(items))
  } catch (error) {
    dispatch(setError(error))
  }
}
