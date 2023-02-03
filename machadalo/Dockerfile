FROM node:12.18.2-buster-slim as build-step
WORKDIR  /src
COPY .  /src
RUN npm i react-scripts --legacy-peer-deps && \
    npm i --legacy-peer-deps && \
    sh -c -- node scripts/build.js && \
    npm i && npm install node-sass --save
