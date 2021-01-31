import {EventEmitter} from 'events';
import RtspRecorder, {RecorderEvents} from 'rtsp-video-recorder';
import {getStream} from './camera';
import {RECORDER} from '../config';
import {CAMERA_STATE} from '../constants';

const log = (event) => (...args) => {
	console.log(new Date().toString());
	console.log(`Event "${event}": `, ...args);
	console.log();
};

export const Events = {
	INIT: 'init',
	INITIALIZED: 'initialized',

	START: 'start',
	STARTED: 'started',

	STOP: 'stopp',
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
				console.error(err);
				return;
			}
		});
	}

	_createRecorder(uri, title) {
		const recorder = new RtspRecorder(uri, RECORDER.FOLDER, {
			title,
			filePattern: title && `${title.replace(/%/g, '%%').replace(/ /g, '_')}/%Y.%m.%d/%H.%M.%S`,
			segmentTime: RECORDER.SEGMENT_TIME,
			dirSizeThreshold: RECORDER.DIR_SIZE_THRESHOLD,
			autoClear: RECORDER.AUTO_CLEAR,
		});

		recorder
			.on(RecorderEvents.STARTED, log(RecorderEvents.STARTED))
			.on(RecorderEvents.STOPPED, log(RecorderEvents.STOPPED))
			.on(RecorderEvents.ERROR, log(RecorderEvents.ERROR))
			.on(RecorderEvents.SEGMENT_STARTED, log(RecorderEvents.SEGMENT_STARTED))
			.on(RecorderEvents.FILE_CREATED, log(RecorderEvents.FILE_CREATED))
			.on(RecorderEvents.STOP, log(RecorderEvents.STOP))
			// .on(RecorderEvents.PROGRESS, log(RecorderEvents.PROGRESS))
			.on(RecorderEvents.SPACE_FULL, log(RecorderEvents.SPACE_FULL))
			.on(RecorderEvents.SPACE_WIPED, log(RecorderEvents.SPACE_WIPED));

		return recorder;
	}

	async init(_id, title, hostname, port, username, password) {
		const {uri} = await getStream(hostname, port, username, password);
		const recorder = this._createRecorder(uri, title);
		recorder
			.on(RecorderEvents.STARTED, (...args) => this.eventEmitter.emit(Events.STARTED, _id, ...args))
			.on(RecorderEvents.STOPPED, (...args) => this.eventEmitter.emit(Events.STOPPED, _id, ...args));
		this.process.set(_id, recorder);
		return recorder;
	}

	start(_id) {
		try {
			const recorder = this.process.get(_id);
			if (recorder.isRecording()) {
				return;
			}
			recorder.start();
			this.process.set(_id, recorder);
		}
		catch (err) {
			console.log({process: this.process, _id});
			throw err;
		}
	}

	stop(_id) {
		try {
			const recorder = this.process.get(_id);
			if (!recorder.isRecording()) {
				return;
			}
			recorder.stop();
			this.process.set(_id, recorder);
		}
		catch (err) {
			console.log({process: this.process, _id});
			throw err;
		}
	}

	on(eventType, callback) {
		this.eventEmitter.on(eventType, callback);
		return this;
	}

	removeListener(eventType, callback) {
		this.eventEmitter.removeListener(eventType, callback);
		return this;
	}
};
