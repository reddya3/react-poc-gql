const config = {
  authMock: {
    port: 6000,
    url: 'http://localhost:6000'
  },
  auth: {
    api: {
      path: '/services/ppe-service-authentication'
    },
    interval: 3300000,
    authorisedRoles: ['ELS-GPO AWS PPE Example Role']
  },
  bffMock: {
    port: 5000,
    url: 'http://localhost:5000',
    api: {
      path: '/api'
    }
  },
  bff: {
    api: {
      acceptHeader: 'application/json',
      contentType: 'application/json; charset=utf-8',
      path: '/services/ppe-service-bff-${webapp-name}/api'
    }
  },
  pact: {
    brokerUrl: 'https://pact-broker.ppe-np.elsevier.com/',
    consumerVersion: '1.0.0',
    bff: {
      consumerName: 'ppe-web-${webapp-name}',
      providerName: 'ppe-service-bff-${webapp-name}',
      pactFolder: 'pacts',
      mockProvider: {
        api: {
          path: '/api',
          matchers: {
            contentType: '(application\\/json; ?charset=(UTF|utf)-8)'
          }
        },
        log: {
          level: 'INFO',
          filename: 'logs/pact.log'
        },
        port: 8022,
        spec: 2,
        url: 'http://localhost:8022'
      }
    }
  },
  webApp: {
    port: 8080,
    path: '/web/ppe-web-${webapp-name}',
    authorisedRoles: [
      'ELS-GPO AWS PPE System Administrators',
      'ELS-GPO AWS PPE Non-Prod System Administrators',
      'ELS-GPO AWS PPE Journal Managers',
      'ELS-GPO AWS PPE Non-Prod Journal Managers'
    ]
  },
  webServer: {
    port: 4000,
    publicDir: '../web-app/dist'
  }
}

module.exports = config
