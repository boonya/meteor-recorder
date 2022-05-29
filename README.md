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
