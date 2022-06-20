FROM node:14.19.3-buster-slim as builder

ARG BUNDLE=meteor-recorder.tar.gz
COPY $BUNDLE meteor-bundle.tar.gz

RUN apt-get update \
	&& apt-get install -y python3 make g++ \
	&& tar -xzvf meteor-bundle.tar.gz \
	&& rm meteor-bundle.tar.gz \
	&& (cd bundle/programs/server && npm install)

FROM node:14.19.3-buster-slim

LABEL maintainer="Serhii [boonya] Buinytskyi <me@boonya.info>"

WORKDIR /usr/src/app
COPY --from=builder bundle .

RUN apt-get update \
	&& apt-get install -y ffmpeg

CMD ["node", "main.js"]
