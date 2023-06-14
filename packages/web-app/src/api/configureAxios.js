import axios from 'axios'

import config from '../../config'

export const configureAxios = ({ onBffUnauthorized }) => {
  const authenticatedPaths = [config.bff.api.path]

  // Configure axios to configure the Authorization header on bff api requests
  axios.interceptors.request.use(requestConfig =>
    authenticatedPaths.some(el => requestConfig.url.includes(el))
      ? {
          ...requestConfig,
          headers: {
            ...requestConfig.headers,
            Authorization: `Bearer ${localStorage.getItem('ppeJwt')}`
          }
        }
      : requestConfig
  )

  // Configure axios to blitz the tokens and redirect to /login on a 401 or 403 response from the bff api
  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.config.url.includes(config.bff.api.path) || error.config.url.includes(config.lov.api.path)) {
        if (error.response.status === 401 || error.response.status === 403) {
          onBffUnauthorized()
        }
      }

      return Promise.reject(error)
    }
  )

  // Set global timeout for 2 minutes
  axios.defaults.timeout = 120000
}
