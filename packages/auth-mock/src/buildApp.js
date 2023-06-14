const express = require('express')
const bodyParser = require('body-parser')
const nJwt = require('njwt')

const buildApp = ({ logger }) => {
  const app = express()

  const secret = 'shhhhhhhh'
  const jwtRegEx = /^[bB]earer\s+([-\w-]+.[-\w]+.[-\w]+)$/
  const userWithoutRole = 'wrong-role'

  const generateJwt = user => {
    const claims = {
      iss: 'ppeMockAuthService',
      sub: user,
      alternativeSubject: user,
      scope: 'self, admins',
      roles: [user !== userWithoutRole ? 'ELS-GPO AWS PPE Journal Managers' : 'ELS-GPO AWS PPE Some Other Role'],
      featureToggles: []
    }

    return nJwt.create(claims, secret).compact()
  }

  const getJwtFromAuthHeader = req => {
    const authorizationHeader = req.header('Authorization')

    const match = jwtRegEx.exec(authorizationHeader || '')
    return match && (match[1] || '')
  }

  app.use(bodyParser.json())

  app.post('/refresh', (req, res) => {
    const token = getJwtFromAuthHeader(req) || ''

    try {
      const jwt = nJwt.verify(token, secret)
      logger.info(`/refresh: 200 - valid mock bearer token "${token}"`)
      res.send({ jwt: generateJwt(jwt.body.sub, jwt.body.sub !== userWithoutRole) })
    } catch (e) {
      logger.info(`/refresh: 401 - invalid mock bearer token "${token}"`)
      res.status(401)
      res.send('Unauthorized')
    }
  })

  app.post('/login', (req, res) => {
    const { username, password } = req.body

    if (password === 'invalid') {
      logger.info(`/login: 401 - invalid password`)
      res.status(401)
      res.send({ errorType: 'LOGIN_FAILED' })
    } else {
      logger.info(`/login: 200 - valid credentials "${username}/${password}"`)
      res.send({ jwt: generateJwt(username) })
    }
  })

  app.post('/logout', (req, res) => {
    const token = getJwtFromAuthHeader(req) || ''

    try {
      nJwt.verify(token, secret)
      res.status(200)
      res.send()
    } catch (e) {
      logger.info(e)
      logger.info(`/logout: 401 - invalid mock bearer token "${token}"`)
      res.status(401)
      res.send('Unauthorized')
    }
  })

  return app
}

module.exports = buildApp
