FROM node:14.19.3-alpine3.15 as builder

ARG BUNDLE=meteor-recorder.tar.gz
COPY $BUNDLE meteor-bundle.tar.gz

RUN apk add --no-cache --virtual .gyp python3 make g++ \
	&& tar -xzvf meteor-bundle.tar.gz \
	&& rm meteor-bundle.tar.gz \
	&& (cd bundle/programs/server && npm install)

FROM node:14.19.3-alpine3.15

WORKDIR /usr/src/app
COPY --from=builder bundle .

RUN apk add --no-cache ffmpeg
VOLUME /mnt
CMD ["node", "main.js"]
