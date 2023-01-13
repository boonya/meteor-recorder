import ConfirmDialog from './ConfirmDialog';
import useConnectDevice from './useConnectDevice';
import useCreateCamera from './useCreateCamera';
import ErrorBoundary from '../../../ErrorBoundary';
import ROUTES from '../../../ROUTES';
import OnvifDeviceForm from '../../../components/OnvifDeviceForm';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, {useCallback, useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function Onvif(props) {
	const [config, setConfig] = useState();
	const navigate = useNavigate();

	const [connect, {loading: connectLoading}] = useConnectDevice();
	const [create, {loading: createLoading}] = useCreateCamera();

	const handleConfirm = useCallback(async ({label, hostname, port, username, password}) => {
		try {
			await connect({hostname, port, username, password});
			setConfig({label, hostname, port, username, password});
		}
		catch {
		// Nothing to do here
		}
	}, [connect]);

	const handleSubmit = useCallback(async () => {
		try {
			await create(config);
			navigate(ROUTES.home);
		}
		finally {
			setConfig();
		}
	}, [create, config, navigate]);

	const onClose = useCallback(() => setConfig(), []);

	return (
		<ErrorBoundary>
			<Grid container direction="column" rowGap={3} {...props}>
				<Typography variant="h1">Create</Typography>
				<OnvifDeviceForm
					onSubmit={handleConfirm}
					loading={connectLoading || createLoading}
				/>
				<ConfirmDialog
					open={Boolean(config)}
					onConfirm={handleSubmit}
					onClose={onClose}
					loading={connectLoading || createLoading}
				/>
			</Grid>
		</ErrorBoundary>
	);
}
