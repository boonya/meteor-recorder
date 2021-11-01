import {callMethod} from '../../api/methods';
import {CAMERA_STATE} from '../../constants';
import METHODS from '../../methods';
import {logError} from '../../utils/logger';
import PropTypes from 'prop-types';
import React from 'react';

export default function Item({_id, title, state}) {
	const handleToggle = React.useCallback(async () => {
		try {
			await callMethod(METHODS.CAMERA_TOGGLE, _id);
		}
		catch (err) {
			logError('Failed to toggle state of camera.')(err);
		}
	}, [_id]);

	const handleRemove = React.useCallback(async () => {
		// eslint-disable-next-line no-alert
		if (confirm('Do you really want to remove a camera?')) {
			try {
				await callMethod(METHODS.CAMERA_REMOVE, _id);
			}
			catch (err) {
				logError('Failed to remove camera.')(err);
			}
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
