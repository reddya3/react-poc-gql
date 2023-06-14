/**
 * @jest-environment node
 */

const path = require('path')
const request = require('supertest')

const buildApp = require('../buildApp')

describe('app', () => {
  const config = {
    publicPath: path.join(process.cwd(), '/src/__mocks__/'),
    spaRootFilename: 'spa-root.txt'
  }

  const app = buildApp(config)

  it('should serve static files', async () => {
    await request(app)
      .get('/test.txt')
      .expect(200, 'test\n')
  })

  it('should return SPA root file if route does not exist', async () => {
    await request(app)
      .get('/does-not-exist')
      .expect(200, 'spa root\n')
  })

  it('should return 200 OK on the endpoint /health', async () => {
    await request(app)
      .get('/health')
      .expect(200, 'healthy')
  })
})
