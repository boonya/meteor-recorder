FROM node:12-alpine as builder

ARG BUNDLE=meteor-ip-cam-recorder.tar.gz

RUN LIST1="$(ls -alh .)" \
	&& echo "The BUNDLE is $BUNDLE" \
	&& echo "Listing 1: $LIST1"

COPY $BUNDLE /usr/src/app/bundle.tgz

WORKDIR /usr/src/app

RUN LIST2="$(ls -alh .)" \
	&& echo "The BUNDLE is $BUNDLE" \
	&& echo "Listing 2: $LIST2"

RUN apk add --no-cache --virtual .gyp python make g++

RUN tar -xzvf bundle.tgz \
	&& (cd bundle/programs/server && npm install) \
	&& apk del .gyp

FROM node:12-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/bundle .
RUN apk add --no-cache ffmpeg
VOLUME /mnt

CMD ["node", "main.js"]
