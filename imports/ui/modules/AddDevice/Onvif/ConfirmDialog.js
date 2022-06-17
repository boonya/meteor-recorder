import {callMethod} from '../../../../api/methods';
import METHODS from '../../../../methods';
import {logError} from '../../../../utils/logger';
import ROUTES from '../../../ROUTES';
import ActionButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import MuiDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useSnackbar} from 'notistack';
import PropTypes from 'prop-types';
import React, {useCallback, useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function ConfirmDialog({data, ...props}) {
	const [loading, setLoading] = useState(false);
	const {enqueueSnackbar} = useSnackbar();
	const navigate = useNavigate();

	const onAdd = useCallback(async () => {
		try {
			const {label, hostname, port, username, password} = data;
			setLoading(true);
			await callMethod(METHODS.CAMERA_CREATE, label, hostname, port, username, password);
			navigate(ROUTES.home);
		}
		catch (err) {
			enqueueSnackbar('Failed to add device.', {variant: 'error'});
			logError('Failed to add device.')(err.reason);
		}
		finally {
			setLoading(false);
			props.onClose();
		}
	}, [data, enqueueSnackbar, navigate, props]);

	return (
		<MuiDialog {...props}>
			<DialogTitle>This device supports rtsp over http.</DialogTitle>
			<DialogContent>
				If you really want add it, please press &quot;Add&quot;. Otherwise press &quot;Cancel&quot;.
			</DialogContent>
			<DialogActions>
				<Button
					variant="outlined"
					onClick={props.onClose}
				>
					Cancel
				</Button>
				<ActionButton
					onClick={onAdd}
					loading={loading}
				>
					Add
				</ActionButton>
			</DialogActions>
		</MuiDialog>
	);
}

const DATA_SHAPE = {
	hostname: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	port: PropTypes.number.isRequired,
	username: PropTypes.string.isRequired,
};

ConfirmDialog.propTypes = {
	data: PropTypes.shape(DATA_SHAPE),
	onClose: PropTypes.func.isRequired,
};

ConfirmDialog.defaultProps = {
	data: undefined,
};
