FROM node:14.19.3-buster-slim as builder

ARG BUNDLE=meteor-recorder.tar.gz
COPY $BUNDLE meteor-bundle.tar.gz

RUN tar -xzvf meteor-bundle.tar.gz \
	&& apt-get update \
	&& apt-get install -y python3 make g++ \
	&& rm meteor-bundle.tar.gz \
	&& (cd bundle/programs/server && npm install)

FROM node:14.19.3-buster-slim

ARG TITLE="meteor-recorder"
ARG LICENSES="MIT"
ARG SOURCE="https://github.com/boonya/meteor-recorder"
ARG AUTHORS="Serhii [boonya] Buinytskyi <me@boonya.info>"
ARG DESCRIPTION
ARG VERSION
ARG REVISION
ARG CREATED

LABEL org.opencontainers.image.base.name "node:14.19.3-buster-slim"
LABEL org.opencontainers.image.title $TITLE
LABEL org.opencontainers.image.licenses $LICENSES
LABEL org.opencontainers.image.source $SOURCE
LABEL org.opencontainers.image.authors $AUTHORS
LABEL org.opencontainers.image.description $DESCRIPTION
LABEL org.opencontainers.image.version $VERSION
LABEL org.opencontainers.image.revision $REVISION
LABEL org.opencontainers.image.created $CREATED

ENV RECORDER_FOLDER="/mnt" \
	ROOT_URL="http://localhost:3000" \
	PORT=3000

WORKDIR /usr/src/app
COPY --from=builder bundle .

RUN apt-get update \
	&& apt-get install -y ffmpeg

CMD ["node", "main.js"]
