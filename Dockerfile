FROM node:12-alpine as builder

ARG BUNDLE=meteor-ip-cam-recorder.tar.gz
COPY $BUNDLE meteor-bundle.tar.gz

RUN apk add --no-cache --virtual .gyp python make g++ \
	&& tar -xzvf meteor-bundle.tar.gz \
	&& rm meteor-bundle.tar.gz \
	&& (cd bundle/programs/server && npm install) \
	&& apk del .gyp


FROM node:12-alpine

WORKDIR /usr/src/app
COPY --from=builder bundle .

RUN apk add --no-cache ffmpeg
VOLUME /mnt
CMD ["node", "main.js"]
