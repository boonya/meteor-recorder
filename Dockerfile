FROM node:12-alpine as builder

ARG BUNDLE=meteor-ip-cam-recorder.tar.gz

RUN echo "The BUNDLE is $BUNDLE"

COPY $BUNDLE /usr/src/app/

WORKDIR /usr/src/app

RUN apk add --no-cache --virtual .gyp python make g++

RUN tar -xzvf $BUNDLE \
	&& (cd bundle/programs/server && npm install) \
	&& apk del .gyp

FROM node:12-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/bundle .
RUN apk add --no-cache ffmpeg
VOLUME /mnt

CMD ["node", "main.js"]
