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
docker build --build-arg BUNDLE=meteor-recorder.tar.gz -t boonya/meteor-recorder:${tag} .
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
docker run --name meteor-recorder --rm \
  -p 3000:3000 \
  -v $HOME/Movies/recorder/:/media/Recorder/:rw \
  -v /etc/localtime:/etc/localtime:ro \
  --env-file .env.recorder \
  boonya/meteor-recorder:${tag}
```
