import initMethods from './methods';
import Recorder, {Events} from '../imports/api/recorder';
import CameraCollection from '../imports/collections/camera';
import {CAMERA_STATE} from '../imports/constants';
import {Meteor} from 'meteor/meteor';

Meteor.startup(() => {
	const cams = CameraCollection.find().fetch();
	const recorder = new Recorder(cams);

	recorder
		.on(Events.STARTED, Meteor.bindEnvironment((_id) => {
			CameraCollection.update(_id, {$set: {state: CAMERA_STATE.rec}});
		}))
		.on(Events.STOPPED, Meteor.bindEnvironment((_id) => {
			CameraCollection.update(_id, {$set: {state: CAMERA_STATE.idle}});
		}));

	initMethods(recorder);
});
