FROM node:18.14.0 as build
WORKDIR  /src
COPY .  /src
RUN	npm install -g npm@9.4.1 && npm install --legacy-peer-deps

FROM node:alpine as main
COPY --from=build /src /
EXPOSE 3000
CMD ["npm", "start"]
