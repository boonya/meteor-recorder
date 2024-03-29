import RecordButton from './RecordButton';
import {callMethod} from '../../api/methods';
import {CAMERA_STATE} from '../../constants';
import METHODS from '../../methods';
import {logError} from '../../utils/logger';
import ROUTES from '../ROUTES';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import React, {useCallback} from 'react';
import {NavLink, generatePath} from 'react-router-dom';

export default function Item({_id, label, state}) {
	const handleRemove = useCallback(async () => {
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

	return (
		<ListItem>
			<ListItemText primary={label} secondary={state || CAMERA_STATE.idle} />
			<RecordButton _id={_id} state={state} />
			<Tooltip title="Edit">
				<IconButton component={NavLink} to={generatePath(ROUTES.editDevice, {deviceId: _id})} aria-label="Edit">
					<EditIcon />
				</IconButton>
			</Tooltip>
			<Tooltip title="Remove">
				<IconButton onClick={handleRemove} aria-label="Remove">
					<DeleteIcon />
				</IconButton>
			</Tooltip>
		</ListItem>
	);
}

Item.propTypes = {
	_id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	state: PropTypes.oneOf(Object.values(CAMERA_STATE)).isRequired,
};
