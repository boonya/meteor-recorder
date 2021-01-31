import METHODS from '../imports/methods';
import {discover, create, remove, toggle} from '../imports/api/camera';

export default (recorder) => Meteor.methods({
	[METHODS.CAMERA_DISCOVER]: discover,
	[METHODS.CAMERA_CREATE]: create(recorder),
	[METHODS.CAMERA_REMOVE]: remove(recorder),
	[METHODS.CAMERA_TOGGLE]: toggle(recorder),
});
