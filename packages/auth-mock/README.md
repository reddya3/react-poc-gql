# auth-mock

This package contains a mock of the PPE authentication service that the web-app package can be developed against. This prevents UI work from being blocked by incomplete services.

## Getting started

Install dependencies.

```
yarn
```

Start the mock server.

```
yarn start
```

### API

* `POST /login` - request payload - `{ "username": "xxx", "password": "xxx" }`
* `POST /refresh` - request a new JWT (current valid JWT must be set in Auth header)
* `POST /logout` - removes any cached login data for the current user (does nothing in this basic mock)

## Built With

* [Node](https://nodejs.org/) - The application runs on Node
* [express](https://expressjs.com/) - The core web server
