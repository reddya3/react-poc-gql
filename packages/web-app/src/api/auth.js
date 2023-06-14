import axios from 'axios'

export const REFRESH_PPE_JWT_ENDPOINT = 'refresh'
export const LOGIN_ENDPOINT = 'login'
export const LOGOUT_ENDPOINT = 'logout'

const authApi = apiPath => {
  const refreshPpeJwt = async ppeJwt => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ppeJwt}`
    }
    const { data } = await axios.post(`${apiPath}/${REFRESH_PPE_JWT_ENDPOINT}`, undefined, { headers })

    return data
  }

  const login = async (username, password, ptsJwt) => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(ptsJwt && { Authorization: `Bearer ${ptsJwt}` })
    }

    const { data } = await axios.post(`${apiPath}/${LOGIN_ENDPOINT}`, { username, password }, { headers })

    return data
  }

  const logout = async ppeJwt => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ppeJwt}`
    }

    await axios.post(`${apiPath}/${LOGOUT_ENDPOINT}`, {}, { headers })
  }

  return { refreshPpeJwt, login, logout }
}

export default authApi
