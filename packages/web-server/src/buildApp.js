const path = require('path')
const express = require('express')
const helmet = require('helmet')
const compression = require('compression')
const proxy = require('http-proxy-middleware')

const config = require('../config')

const buildApp = ({ publicPath, spaRootFilename }) => {
  const isDev = process.env.NODE_ENV === 'development'

  const app = express()
  app.use(helmet())
  app.use(compression())

  if (isDev) {
    app.use(
      config.bff.api.path,
      proxy({
        changeOrigin: true,
        target: config.bffMock.url,
        pathRewrite: {
          [`^${config.bff.api.path}`]: config.bffMock.api.path
        }
      })
    )
  }

  app.get('/health', (req, res) => {
    res.send('healthy')
  })

  app.use(isDev ? config.webApp.path : '/', express.static(publicPath))

  // Serve SPA web app on all routes by default
  // This allows you to browse to a route that only exists via a client side router
  const indexPath = path.join(publicPath, spaRootFilename)
  app.get('*', (req, res) => {
    res.sendFile(indexPath)
  })

  return app
}

module.exports = buildApp
