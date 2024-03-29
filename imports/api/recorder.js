import {connect, getProfiles, getStream} from './camera';
import {RECORDER, ENV} from '../config';
import {CAMERA_STATE} from '../constants';
import getDateString from '../utils/date-string';
import {logInfo, logError} from '../utils/logger';
import {EventEmitter} from 'events';
import RtspRecorder, {RecorderEvents} from 'rtsp-video-recorder';

const log = (event, name) => (...args) => {
	logInfo(`"${name}" emitted "${event}" at`, new Date().toString())(...args);
};

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

	async _initAllCams() {
		const promises = this.list.map(({_id, label, hostname, port, username, password, state}) => {
			return this._initCam(_id, label, hostname, port, username, password, state);
		});
		return Promise.all(promises);
	}

	async _initCam(_id, label, hostname, port, username, password, state) {
		try {
			await this.init(_id, label, hostname, port, username, password);
			if (state === CAMERA_STATE.rec) {
				this.start(_id);
			}
			return _id;
		}
		catch (err) {
			logError('Camera has failed to initialize.')({_id, label, hostname, err});
			throw new Error('Camera has failed to initialize.');
		}
	}

	_createRecorder(_id, uri, title) {
		const recorder = new RtspRecorder(uri, RECORDER.FOLDER, {
			title,
			playlistName: title && `${title}-${getDateString()}`,
			filePattern: title && `${title.replace(/%/ug, '%%')}-%Y.%m.%d/%H.%M.%S`,
			segmentTime: RECORDER.SEGMENT_TIME,
			dirSizeThreshold: RECORDER.DIR_SIZE_THRESHOLD,
		});

		recorder
			.on(RecorderEvents.STARTED, (...args) => this.eventEmitter.emit(Events.STARTED, _id, ...args))
			.on(RecorderEvents.STOPPED, (...args) => this.eventEmitter.emit(Events.STOPPED, _id, ...args));

		recorder
			.on(RecorderEvents.START, log(RecorderEvents.START, title))
			.on(RecorderEvents.STARTED, log(RecorderEvents.STARTED, title))
			.on(RecorderEvents.STOP, log(RecorderEvents.STOP, title))
			.on(RecorderEvents.STOPPED, log(RecorderEvents.STOPPED, title))
			.on(RecorderEvents.ERROR, log(RecorderEvents.ERROR, title))
			.on(RecorderEvents.FILE_CREATED, log(RecorderEvents.FILE_CREATED, title))
			.on(RecorderEvents.SPACE_FULL, log(RecorderEvents.SPACE_FULL, title));

		const logProgress = log(RecorderEvents.PROGRESS, title);

		if (ENV.SHOW_PROGRESS) {
			recorder.on(RecorderEvents.PROGRESS, logProgress);
		}
		else {
			recorder
				.on(RecorderEvents.STARTED, () => {
					recorder.removeListener(RecorderEvents.PROGRESS, logProgress);
				})
				.on(RecorderEvents.STOPPED, () => {
					recorder.removeListener(RecorderEvents.PROGRESS, logProgress);
				})
				.on(RecorderEvents.STOP, () => {
					recorder.on(RecorderEvents.PROGRESS, logProgress);
				});
		}

		return recorder;
	}

	async init(_id, title, hostname, port, username, password) {
		const cam = await connect(hostname, port, username, password);
		const profiles = getProfiles(cam);
		const {uri} = await getStream(cam, profiles[0].token);
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
		if (!recorder?.isRecording()) {
			return;
		}
		recorder?.stop();
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
