import {RECORDER, ENV} from '../config';
import {CAMERA_STATE} from '../constants';
import {logInfo, logError} from '../utils/logger';
import {getStream} from './camera';
import {EventEmitter} from 'events';
import RtspRecorder, {RecorderEvents} from 'rtsp-video-recorder';

const log = (event) => (...args) => {
	logInfo(`Recorder Event "${event}" at`, new Date().toString())(...args);
};

const logProgress = log(RecorderEvents.PROGRESS);

export const Events = {
	INIT: 'init',
	INITIALIZED: 'initialized',
	START: 'start',
	STARTED: 'started',
	STOP: 'stop',
	STOPPED: 'stopped',
};

export default class Recorder {
	constructor(list) {
		this.eventEmitter = new EventEmitter();
		this.list = list;
		this.process = new Map();
		this._initAllCams();
	}

	_initAllCams() {
		this.list.forEach(async ({_id, title, hostname, port, username, password, state}) => {
			try {
				await this.init(_id, title, hostname, port, username, password);
				if (state === CAMERA_STATE.rec) {
					this.start(_id);
				}
			}
			catch (err) {
				logError('Camera failed to initialize.')({_id, title, hostname, err});
			}
		});
	}

	_createRecorder(_id, uri, title) {
		const prefix = title.replace(/ /ug, '_');
		const recorder = new RtspRecorder(uri, RECORDER.FOLDER, {
			title,
			playlistName: prefix && `${prefix}-$(date +%Y.%m.%d-%H.%M.%S)`,
			filePattern: prefix && `${prefix.replace(/%/ug, '%%')}-%Y.%m.%d/%H.%M.%S`,
			segmentTime: RECORDER.SEGMENT_TIME,
			dirSizeThreshold: RECORDER.DIR_SIZE_THRESHOLD,
		});

		recorder
			.on(RecorderEvents.STARTED, (...args) => this.eventEmitter.emit(Events.STARTED, _id, ...args))
			.on(RecorderEvents.STOPPED, (...args) => this.eventEmitter.emit(Events.STOPPED, _id, ...args));

		recorder
			.on(RecorderEvents.START, log(RecorderEvents.START))
			.on(RecorderEvents.STARTED, log(RecorderEvents.STARTED))
			.on(RecorderEvents.STOP, log(RecorderEvents.STOP))
			.on(RecorderEvents.STOPPED, log(RecorderEvents.STOPPED))
			.on(RecorderEvents.ERROR, log(RecorderEvents.ERROR))
			.on(RecorderEvents.FILE_CREATED, log(RecorderEvents.FILE_CREATED))
			.on(RecorderEvents.SPACE_FULL, log(RecorderEvents.SPACE_FULL))

		if (ENV.DEBUG_PROGRESS) {
			recorder.on(RecorderEvents.PROGRESS, logProgress);
		}
		else {
			recorder
				.on(RecorderEvents.STARTED, () => {
					recorder.removeListener(RecorderEvents.PROGRESS, logProgress);
				})
				.on(RecorderEvents.STOP, () => {
					recorder.on(RecorderEvents.PROGRESS, logProgress);
			});
		}

		return recorder;
	}

	async init(_id, title, hostname, port, username, password) {
		const {uri} = await getStream(hostname, port, username, password);
		const recorder = this._createRecorder(_id, uri, title);
		this.process.set(_id, recorder);
		return recorder;
	}

	start(_id) {
		const recorder = this.process.get(_id);
		if (recorder.isRecording()) {
			return;
		}
		recorder.start();
		this.process.set(_id, recorder);
	}

	stop(_id) {
		const recorder = this.process.get(_id);
		if (!recorder.isRecording()) {
			return;
		}
		recorder.stop();
		this.process.set(_id, recorder);
	}

	// eslint-disable-next-line promise/prefer-await-to-callbacks
	on(eventType, callback) {
		this.eventEmitter.on(eventType, callback);
		return this;
	}

	// eslint-disable-next-line promise/prefer-await-to-callbacks
	removeListener(eventType, callback) {
		this.eventEmitter.removeListener(eventType, callback);
		return this;
	}
}
