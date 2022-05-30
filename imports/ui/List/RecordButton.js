import {callMethod} from '../../api/methods';
import {CAMERA_STATE} from '../../constants';
import METHODS from '../../methods';
import {logError} from '../../utils/logger';
import RecordIcon from '@mui/icons-material/FiberManualRecord';
import StopIcon from '@mui/icons-material/Stop';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import React, {useMemo, useCallback, useState, useRef, useEffect} from 'react';

export default function RecordButton({_id, state}) {
	const [loading, setLoading] = useState(false);
	const prevState = useRef(state);

	const label = useMemo(() => {
		return state === CAMERA_STATE.rec ? 'Stop recording' : 'Start recording';
	}, [state]);

	const StateIcon = useMemo(() => {
		return state === CAMERA_STATE.rec ? StopIcon : RecordIcon;
	}, [state]);

	const onClick = useCallback(async () => {
		try {
			setLoading(true);
			await callMethod(METHODS.CAMERA_TOGGLE, _id);
		}
		catch (err) {
			logError('Failed to toggle state of camera.')(err);
		}
	}, [_id]);

	useEffect(() => {
		if (prevState.current !== state) {
			setLoading(false);
			prevState.current = state;
		}
	}, [state]);

	return (
		<Tooltip title={label}>
			<span>
				<IconButton onClick={onClick} aria-label={label} disabled={loading}>
					<StateIcon />
				</IconButton>
			</span>
		</Tooltip>
	);
}

RecordButton.propTypes = {
	_id: PropTypes.string.isRequired,
	state: PropTypes.string.isRequired,
};
