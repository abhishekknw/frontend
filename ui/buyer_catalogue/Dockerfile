FROM node:10.8.0 as build
WORKDIR /app
# COPY package.json bower.json Gruntfile.js ./
COPY .  /app
RUN	apt-get -y install git && apt-get -y install bzip2 && \
	git config --global url."https://".insteadOf git:// && \
	npm install -g bower && npm install -g grunt-cli && \
	bower install && npm install

FROM node:alpine as main
COPY --from=build /app /
RUN npm install -g bower && npm install -g grunt-cli && \
	bower install && npm install
EXPOSE 9000
CMD ["Gruntfile.js"]
