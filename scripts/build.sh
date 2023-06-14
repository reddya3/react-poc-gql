#!/bin/sh

# Clean last build
rm -rf dist

# Make dist directories
mkdir dist
mkdir dist/public
mkdir dist/src
mkdir dist/config

# Build web app
cd packages/web-app
yarn build
cd ../..

# Copy config
cp -a config/. dist/config

# Copy web app build output
cp -a packages/web-app/dist/. dist/public

# Copy server
cp -a packages/web-server/src/. dist/src
cp packages/web-server/package.json dist
cp packages/web-server/yarn.lock dist