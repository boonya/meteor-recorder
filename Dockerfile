FROM node:12-alpine as builder
WORKDIR /usr/src/app
RUN apk add --no-cache --virtual .gyp python make g++
COPY meteor-bundle.tar.gz ./
RUN tar -xzvf recorder.tgz \
	&& (cd bundle/programs/server && npm install) \
	&& apk del .gyp

FROM node:12-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/bundle .
RUN apk add --no-cache ffmpeg
VOLUME /mnt
CMD ["node", "main.js"]
