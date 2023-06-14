# PPE Web App Template

This repository is a boilerplate PPE web app template.

## Make this repo your own

Clone this repository into a new folder and reset git to disassociate it from the templates repository.

```
git clone git@gitlab.et-scm.com:PPE/ppe-web-app-template.git ppe-my-app
cd ppe-my-app
rm -rf .git
git init
```

Find and replace the string (without the quotes) '${webapp-name}' with the name of the web application.  The value should be lowercase and hyphenated e.g. issue-compilation

Change directory name inside the project root folder from `helm/ppe-web-app-template` to `helm/${webapp-name}`

Update the title element in the `web-app` package's template located at `/public/index.html`.

Amend the title of this README and change the initial description to one about your app.

Run the app locally by following the **Getting started** section in this README.

There is an example component in the `web-app` package `src/components/Items` that demonstrates fetching items from the `bff-mock` package. There are also unit and pact tests showing how to test these interactions. Once you understand how everything hooks up remove those examples.

Now the project is ready to be committed to your project's git repository.

```
git add -A
git commit -m "Initial commit"
git remote add origin git@gitlab.et-scm.com:PPE/ppe-my-app.git
git push origin master
```

Now code your app!

## About this repository

This repository is a monorepo powered by [lernajs](https://lernajs.io/). All apps and libraries live under the `/packages` folder and each contains their own `README.md`.

### Packages

* `bff-mock` - A mock implementation of the Backend for Frontend service for the web application.
* `web-app` - The client side web application.
* `web-server` - The web server that serves the built web application.

## Prerequisites

You'll need to have the following installed on your machine:

* [Node](https://nodejs.org) (LTS is 8.11.1 at time of writing)
* [Yarn](https://yarnpkg.com)
* [Docker](https://www.docker.com/)

## Getting started

Install dependencies for all packages and create of any mock files required.

```
yarn bootstrap
```

Start the web-app package in development mode.

```
yarn start:web-app
```

Start the web-app package in development mode pointing to a running bff-mock package. See the web-app packages `README.md` to ensure it is configured correctly to point to the mock.

```
yarn start:web-app:mock
```

Start the web-server package in development mode (When first run it also builds the `web-app` package to serve).

```
yarn start:web-server
```

Start the web-server package in development mode pointing to a running bff-mock package. See the web-server packages `README.md` to ensure it is configured correctly to point to the mock.

```
yarn start:web-server:mock
```

### Config

Found in the root of the project under `/config`. Each package contains a `config.js` file that forwards on the root config to make it more accessible to files in the package.

## Running tests

Run unit and pact tests in all packages. The `web-app` package's tests are ran first in isolation so that it can generate it's pacts. These are used by the `bff-mock` package to verify it's API.

```
yarn test
```

### Publishing pacts

Publish any locally generated pacts to the global pact broker. **Don't use this unless you know what you're doing**.

```
yarn test:pact:publish
```

## Linting the code

All code in this repository is linted via:

* [ESLint](https://eslint.org/) - Lints JavaScript
* [StyleLint](https://stylelint.io/) - Lints CSS & SCSS

Lint all JavaScript and SCSS in all packages.

```
yarn lint
```

## Build

Build the `web-app` package and copy all files **excluding node_modules** required for the docker image into `/dist`.

```
yarn build
```

## Building the docker container

Build a local docker image of this app. The docker build requires `yarn build` be run first to ensure files it depends on are created.

```
docker build -t <name>:<version> .
```

### Running the docker container locally

To run the a container of the build image you will need to inject any environment variables required by the web-server package.

```
docker run -d -p 4000:4000 -e PUBLIC_DIR="public" <name>:<version>
```
