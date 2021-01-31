import { Mongo } from 'meteor/mongo';
import { Discovery, Cam } from 'onvif';
import {CAMERA_STATE} from '../constants';

const Collection = new Mongo.Collection('camera');

export default Collection;

export function discover() {
	return new Promise((resolve, reject) => {
		try {
			Discovery.probe((err, cams) => {
				if (err) throw new Error(err);
				resolve(cams);
			});
		} catch (error) {
			console.error(error);
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

export function getStream(hostname, port = '8899', username = 'admin', password = '') {
	return new Promise((resolve, reject) => {
		try {
			new Cam({hostname, port, username, password}, function(err) {
				if (err) {
					reject(err);
					return;
				}
				this.getStreamUri({protocol: 'RTSP'}, (err, stream) => {
					if (err) {
						reject(err);
						return;
					}
					resolve(stream);
				});
			});
		} catch (error) {
			reject(error);
		}
	});
}
