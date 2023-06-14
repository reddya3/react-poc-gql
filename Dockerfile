#---------------------------------------------
# Install dist production dependencies
#---------------------------------------------
FROM node:fermium-alpine as deps

WORKDIR /

COPY dist/package.json .
COPY dist/yarn.lock .

RUN yarn --production

#---------------------------------------------
# Compile final image
#---------------------------------------------
FROM node:fermium-alpine

WORKDIR /

COPY --from=deps node_modules node_modules
COPY dist .
COPY packages/web-server/newrelic.js /src/newrelic.js

EXPOSE 4000

ENTRYPOINT node /src/server.js
