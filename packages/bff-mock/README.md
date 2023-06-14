# bff-mock

This package contains the mock backend for frontend (BFF) that the web-app package can be developed against. This prevents UI work from being blocked by incomplete services.

## Getting started

Running `yarn bootstrap` in the root of the repository will install dependencies and generate a `mock.json` via the `generate-mock` script. However you can do it manually.

Install dependencies.

```
yarn
```

Then configure your mocks. The package `json-server` is used which uses the mocks.json file to stub a simple mock API. It is a simple `Express` web server under the hood and so it is very extensible and easy to add custom endpoints to.

Generate mock.

```
yarn generate-mock
```

Start the mock server.

```
yarn start
```

## Running tests

Tests in this package are powered by:

* [Jest](https://facebook.github.io/jest/)
* [Pact](https://github.com/pact-foundation/pact-js)

Run all tests.

```
yarn test
```

Run pact tests. The pact tests use the `mock.pact.json` file as the servers mock file.

```
yarn test:pact
```

Run pact tests in watch mode. The pact tests use the `mock.pact.json` file as the servers mock file.

```
yarn test:pact:watch
```

### Generating mock data

You can generate mock data quickly via the generate script.

```
yarn generate-mock
```

## Built With

* [Node](https://nodejs.org/) - The application runs on Node
* [json-server](https://github.com/typicode/json-server) - The core mocking server
