# Video Recorder application that captures IP Web Cams RTSP streams

![Verification](https://github.com/boonya/meteor-recorder/workflows/Verification/badge.svg)
![Release](https://github.com/boonya/meteor-recorder/workflows/Build%20and%20release%20bundle%20and%20docker%20image/badge.svg)

## Run application in dev mode

```sh
RECORDER_FOLDER="$(echo ~/Movies/IPCams)" npm start
```

or

```sh
export $(cat .env.local) && npm start
```

## Build Docker image

```sh
npm run build
docker build -t boonya/meteor-recorder:${tag} .
```

## MongoDB

Meteor Recorder application depends on mongodb, so you have to start your mongodb first. You can do it by running appropriate docker container:

```sh
docker run --rm --name meteor-recorder-mongo \
  -p 27017:27017 \
  -v $(pwd)/mongo/initdb.d/:/docker-entrypoint-initdb.d/:ro \
  -v mongo-configdb:/data/configdb \
  -v mongo-db:/data/db \
  --env-file .env.mongo \
  mongo:4.4.10
```

### To connect to your MongoDB you can execute

```sh
mongo -u ${MONGO_USERNAME} -p ${MONGO_PASSWORD}
use ${MONGO_DB}
```

## Application docker container

```sh
docker run --rm --name meteor-recorder \
  --env TZ=Europe/Kiev \
  -p 3000:3000 \
  --env MONGO_URL=mongodb://recorder:${MONGO_PASSWORD}@localhost:27017/recorder \
  -v $HOME/Movies/recorder:/mnt:rw \
  --env RECORDER_DIR_SIZE_THRESHOLD=200G \
  --env RECORDER_SEGMENT_TIME=600 \
  --env SHOW_LOGS=true \
  boonya/meteor-recorder:${tag}
```
