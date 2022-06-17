import {callMethod} from '../../../../api/methods';
import METHODS from '../../../../methods';
import {logError} from '../../../../utils/logger';
import ConfirmDialog from './ConfirmDialog';
import Form from './Form';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {useSnackbar} from 'notistack';
import React, {useCallback, useState} from 'react';

export default function Onvif(props) {
	const [device, setDevice] = useState();
	const [loading, setLoading] = useState(false);
	const {enqueueSnackbar} = useSnackbar();

	const onSubmit = useCallback(async ({label, hostname, port, username, password}) => {
		try {
			setLoading(true);
			await callMethod(METHODS.CAMERA_CONNECT, hostname, port, username, password);
			setDevice({label, hostname, port, username, password});
		}
		catch (err) {
			enqueueSnackbar('Failed to connect to the device.', {variant: 'error'});
			logError('Failed to connect to the device.')(err.reason);
		}
		finally {
			setLoading(false);
		}
	}, [enqueueSnackbar]);

	const onClose = useCallback(() => setDevice(), []);

	return (
		<Grid {...props}>
			<Typography variant="h1">ONVIF</Typography>
			<Form onSubmit={onSubmit} loading={loading} />
			<ConfirmDialog open={Boolean(device)} data={device} onClose={onClose} />
		</Grid>
	);
}
