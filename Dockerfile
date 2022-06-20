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
ARG DESCRIPTION
ARG LICENSES="MIT"
ARG SOURCE="https://github.com/boonya/meteor-recorder"
ARG VERSION
ARG REVISION
ARG CREATED
ARG AUTHORS="Serhii [boonya] Buinytskyi <me@boonya.info>"

LABEL org.opencontainers.image.title="${TITLE}" \
	org.opencontainers.image.description="${DESCRIPTION}" \
	org.opencontainers.image.licenses="${LICENSES}" \
	org.opencontainers.image.authors="${AUTHORS}" \
	org.opencontainers.image.created="${CREATED}" \
	org.opencontainers.image.source="${SOURCE}" \
	org.opencontainers.image.version="${VERSION}" \
	org.opencontainers.image.revision="${REVISION}" \
	org.opencontainers.image.base.name="node:14.19.3-buster-slim"

ENV RECORDER_FOLDER="/mnt" \
	ROOT_URL="http://localhost:3000" \
	PORT=3000

WORKDIR /usr/src/app
COPY --from=builder bundle .

RUN apt-get update \
	&& apt-get install -y ffmpeg

CMD ["node", "main.js"]
