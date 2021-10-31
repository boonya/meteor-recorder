import CameraCollection from '../imports/api/camera';
import Recorder, {Events} from '../imports/api/recorder';
import {CAMERA_STATE} from '../imports/constants';
import initMethods from './methods';
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
