import React from 'react'
import METHODS from '../../methods';
import {CAMERA_STATE} from '../../constants';

export default function Camera({_id, title, state}) {
	const handleToggle = React.useCallback(() => {
		Meteor.call(METHODS.CAMERA_TOGGLE, _id, (err) => {
			if (err) console.error(err);
		});
	}, [_id]);

	const handleRemove = React.useCallback(() => {
		Meteor.call(METHODS.CAMERA_REMOVE, _id, (err) => {
			if (err) console.error(err);
		});
	}, []);

	return (
		<div>
			{title}{' / '}
			{state || CAMERA_STATE.idle}{' / '}
			<button onClick={handleToggle}>{state !== CAMERA_STATE.rec ? 'Start recording' : 'Stop recording'}</button>{' / '}
			<button onClick={handleRemove}>Remove</button>
		</div>
	)
}
