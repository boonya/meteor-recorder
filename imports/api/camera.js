import {CAMERA_STATE} from '../constants';
import {logError} from '../utils/logger';
import {Mongo} from 'meteor/mongo';
import {Discovery, Cam} from 'onvif';

const Collection = new Mongo.Collection('camera');

export default Collection;

export function discover() {
	return new Promise((resolve, reject) => {
		try {
			// eslint-disable-next-line promise/prefer-await-to-callbacks
			Discovery.probe((err, cams) => {
				if (err) {
					logError('Failed to discover.')(err);
					reject(err);
				}
				resolve(cams);
			});
		}
		catch (error) {
			logError('Failed to discover.')(error);
			reject(error);
		}
	});
}

export const create = (recorder) => (label, hostname, port, username, password) => {
	const _id = Collection.insert({label, hostname, port, username, password, state: CAMERA_STATE.idle});
	recorder.init(_id, label, hostname, port, username, password);
};

export const update = (recorder) => (_id, label, hostname, port, username, password) => {
	recorder.stop(_id);
	Collection.upsert(_id, {label, hostname, port, username, password, state: CAMERA_STATE.idle});
	recorder.init(_id, label, hostname, port, username, password);
};

export const remove = (recorder) => (_id) => {
	recorder.stop(_id);
	Collection.remove(_id);
};

export const toggle = (recorder) => (_id) => {
	const {state} = Collection.findOne(_id);
	if (state === CAMERA_STATE.rec) {
		recorder.stop(_id);
	}
	else {
		recorder.start(_id);
	}
};

export async function getCameraConfig(_id) {
	const {label, hostname, port, username} = Collection.findOne(_id);
	return {label, hostname, port, username};
}

export async function connect(hostname, port, username, password) {
	try {
		return await new Promise((resolve, reject) => {
		// eslint-disable-next-line no-new
			new Cam({hostname, port, username, password, timeout: 10000}, function (error) {
				if (error) {
					return reject(error);
				}
				// eslint-disable-next-line no-invalid-this
				return resolve(this);
			});
		});
	}
	catch (err) {
		throw new Meteor.Error('Failed to connect', err.message, err);
	}
}

export function getProfiles(cam) {
	return cam.profiles.map(({name, $}) => ({name, token: $.token}));
}

export async function getStream(cam, profileToken) {
	return new Promise((resolve, reject) => {
		// eslint-disable-next-line promise/prefer-await-to-callbacks
		cam.getStreamUri({protocol: 'RTSP', profileToken}, (err, stream) => {
			if (err) {
				return reject(err);
			}
			return resolve(stream);
		});
	});
}
