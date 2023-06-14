import authApi from '../../../api/auth'
import config from '../../../../config'
import { setLoggedOut } from './actions'

export const logout = () => async dispatch => {
  const auth = authApi(config.auth.api.path)
  await auth.logout(localStorage.getItem('ppeJwt'))
  localStorage.removeItem('ppeJwt')
  dispatch(setLoggedOut())
}
