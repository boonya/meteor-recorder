import {CAMERA_STATE} from '../../constants';
import METHODS from '../../methods';
import {logError} from '../../utils/logger';
import PropTypes from 'prop-types';
import React from 'react';

export default function Item({_id, title, state}) {
	const handleToggle = React.useCallback(() => {
		// eslint-disable-next-line promise/prefer-await-to-callbacks
		Meteor.call(METHODS.CAMERA_TOGGLE, _id, (err) => {
			if (err) { logError('Failed to toggle state of camera.')(err); }
		});
	}, [_id]);

	const handleRemove = React.useCallback(() => {
		if (confirm('Do you really want to remove a camera?')) {
			// eslint-disable-next-line promise/prefer-await-to-callbacks
			Meteor.call(METHODS.CAMERA_REMOVE, _id, (err) => {
				if (err) { logError('Failed to remove camera.')(err); }
			});
		}
	}, [_id]);

	const toggleButtonLabel = React.useMemo(() => {
		return state === CAMERA_STATE.rec ? 'Stop recording' : 'Start recording';
	}, [state]);

	return (
		<div>
			{title}{' / '}
			{state || CAMERA_STATE.idle}{' / '}
			<button type="button" onClick={handleToggle}>{toggleButtonLabel}</button>{' / '}
			<button type="button" onClick={handleRemove}>Remove</button>
		</div>
	);
}

Item.propTypes = {
	_id: PropTypes.string.isRequired,
	state: PropTypes.oneOf(Object.values(CAMERA_STATE)).isRequired,
	title: PropTypes.string.isRequired,
};
