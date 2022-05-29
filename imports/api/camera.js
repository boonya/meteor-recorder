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

export const create = (recorder) => (title, hostname, port, path, uri, username = 'admin', password = '') => {
	const _id = Collection.insert({title, hostname, path, port, uri, username, password, state: CAMERA_STATE.idle});
	recorder.init(_id, title, hostname, port, username, password);
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

async function getCam(hostname, port = '8899', username = 'admin', password = '') {
	return new Promise((resolve, reject) => {
		try {
			// eslint-disable-next-line no-new
			new Cam({hostname, port, username, password}, function (error) {
				if (error) {
					return reject(error);
				}
				// eslint-disable-next-line no-invalid-this
				return resolve(this);
			});
		}
		catch (err) {
			reject(err);
		}
	});
}

export function getProfiles(cam) {
	return cam.profiles.map(({name, $}) => ({name, token: $.token}));
}

export async function getStream(...args) {
	const cam = await getCam(...args);
	const profiles = getProfiles(cam);
	return new Promise((resolve, reject) => {
		try {
			cam.getStreamUri({protocol: 'RTSP', profileToken: profiles[0].token}, (getStreamErr, stream) => {
				if (getStreamErr) {
					return reject(getStreamErr);
				}
				return resolve(stream);
			});
		}
		catch (err) {
			reject(err);
		}
	});
}
