import {callMethod} from '../../../../api/methods';
import METHODS from '../../../../methods';
import {logError} from '../../../../utils/logger';
import Form from './Form';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {useSnackbar} from 'notistack';
import React, {useCallback, useState} from 'react';

export default function Onvif(props) {
	const [loading, setLoading] = useState(false);
	const {enqueueSnackbar} = useSnackbar();

	const onSubmit = useCallback(async ({hostname, port, username, password}) => {
		try {
			setLoading(true);
			const camera = await callMethod(METHODS.CAMERA_CONNECT, hostname, port, username, password);
			console.log('camera:', camera);
		}
		catch (err) {
			enqueueSnackbar(err.error, {variant: 'error'});
			logError(err.error)(err.reason);
		}
		finally {
			setLoading(false);
		}
	}, [enqueueSnackbar]);

	return (
		<Grid {...props}>
			<Typography variant="h1">ONVIF</Typography>
			<Form onSubmit={onSubmit} loading={loading} />
		</Grid>
	);
}
