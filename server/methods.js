import {
	discover,
	create,
	remove,
	toggle,
	connect,
} from '../imports/api/camera';
import METHODS from '../imports/methods';

export default (recorder) => Meteor.methods({
	[METHODS.CAMERA_DISCOVER]: discover,
	[METHODS.CAMERA_CONNECT]: connect,
	[METHODS.CAMERA_CREATE]: create(recorder),
	[METHODS.CAMERA_REMOVE]: remove(recorder),
	[METHODS.CAMERA_TOGGLE]: toggle(recorder),
});
