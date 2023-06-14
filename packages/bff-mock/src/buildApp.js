const jsonServer = require('json-server')
const bodyParser = require('body-parser')

const config = require('../config')

const buildApp = ({ mockFilename }) => {
  const app = jsonServer.create()

  // Register json server's middlewares
  const middlewares = jsonServer.defaults()
  app.use(middlewares)
  app.use(bodyParser.json({ type: 'application/*+json' }))

  // Configure response with correct API version
  app.use((req, res, next) => {
    res.header('Content-Type', config.bff.api.contentType)
    next()
  })

  // Register any custom endpoints here before the jsonServer router is registered.
  // You can modify the 'mock.json' file and the changes will be reflected in the mock server.
  // app.use('/custom', customMiddleware())

  // Register router
  app.use(config.bffMock.api.path, jsonServer.router(mockFilename))

  return app
}

module.exports = buildApp
