FROM  node:10.8.0
WORKDIR  /app
COPY .  /app
RUN apt-get update && \
	apt-get -y install git && \
	apt-get -y install bzip2
RUN git config --global url."https://".insteadOf git://
RUN npm install -g bower && \
	npm install -g grunt-cli
RUN bower install --allow-root && \
	npm install
