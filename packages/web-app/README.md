# web-app

This package contains the client application that the web-server package will serve.

## Getting started

Install dependencies. This can be done here, but really should done in the repository root directory via `yarn bootstrap`.

```
yarn
```

Start the web app in development mode.

```
yarn start
```

Start the app in development mode pointing to a running bff-mock package. Ensure the constant `MOCK_BFF_URL` variable is correct in `webpack.config.babel.js`.

```
yarn start:mock
```

## Running tests

Unit tests in this package are powered by:

* [Jest](https://facebook.github.io/jest/)
* [Enzyme](http://airbnb.io/enzyme/)
* [Pact](https://github.com/pact-foundation/pact-js)

Run all tests. This also outputs coverage.

```
yarn test
```

Run unit tests.

```
yarn test:unit
```

Run unit tests in watch mode.

```
yarn test:unit:watch
```

Run pact tests.

```
yarn test:pact
```

Run pact tests in watch mode.

```
yarn test:pact:watch
```

## Build

Perform a production build into `/dist`.

```
yarn build
```

### Configuring port

Edit the constant `DEV_SERVER_PORT` in `webpack.config.babel.js`.

## General Architecture

This project has a number of folders under `/src`.

* `/api` - Place any API calls under here, pact contracts are derived from these calls
* `/assets` - Any static assets that are imported and loaded via webpack are placed in here such as SVG icons
* `/helpers` - Small, concise helper functions and constants
* `/modules` - The bulk of the application will be split into modules that provide clear boundaries of functionality.
* `/scss` - The ITCSS SASS project powering the styles of the project
* `/state` - The applications state is managed in here. It consists of a Redux store following the Ducks pattern.

## SASS Architecture

This project uses an ITCSS architecture. This consists of a 7 layers. These layers are compiled in order, each contains more and more specific CSS. This reduces the impact of CSS specifity becoming an issue.

* **Settings** - Global configuration and variables (outputs no CSS).
* **Tools** - Mixins and functions (outputs no CSS).
* **Generic** - High level styles such as resets and normalize.css.
* **Elements** - Base HTML styling.
* **Objects** - Common non-cosmetic structural design patterns. These are used for layout and should not produce any visuals.
* **Components** - Specific costmetic elements of UI.
* **Utilities** - Helpers and overrides, these should be atomic and imutable via the use of `!important`.

### CSS Class Structure

Structure your CSS classes as follows:

```
// Position
position: absolute;
left: 0;
...

// Display and box model
display: block;
padding: 1rem;
margin: 1rem;
...

// Typography
font-size: 1rem;
font-weight: 500;
...

// Cosmetic
color: #222;
background-color: #fff;
...

// Native interaction
cursor: pointer;
pointer-events: none;
...

// Media queries
@media (min-width: 1000px) {
  ...
}
```

## Built With

* [Webpack](https://webpack.js.org/) - Builds the web app
* [React](https://reactjs.org/) - The core framework powering the UI
* [Redux](https://redux.js.org) - The state store
