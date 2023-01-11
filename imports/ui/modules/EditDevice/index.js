import ErrorBoundary from '../../ErrorBoundary';
import ROUTES from '../../ROUTES';
import OnvifDeviceForm from '../../components/OnvifDeviceForm';
import useConnectDevice from '../AddDevice/Onvif/useConnectDevice';
import ConfirmDialog from './ConfirmDialog';
import useFetchConfig from './useFetchConfig';
import useSaveConfig from './useSaveConfig';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React, {useCallback, useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';

export default function EditDevice(props) {
	const {deviceId} = useParams();
	const [config, setConfig] = useState();
	const navigate = useNavigate();

	const [fetchConfig, {
		data: savedConfig,
		loading: fetchLoading,
	}] = useFetchConfig();
	const [connect, {loading: connectLoading}] = useConnectDevice();
	const [save, {loading: saveLoading}] = useSaveConfig();

	const loading = fetchLoading || connectLoading || saveLoading;

	useEffect(() => {
		fetchConfig(deviceId);
	}, [deviceId, fetchConfig]);

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
			await save(deviceId, config);
			navigate(ROUTES.home);
		}
		finally {
			setConfig();
		}
	}, [save, deviceId, config, navigate]);

	const onClose = useCallback(() => setConfig(), []);

	return (
		<ErrorBoundary>
			<Grid container direction="column" rowGap={3} {...props}>
				<Typography variant="h1">Edit</Typography>
				<OnvifDeviceForm
					onSubmit={handleConfirm}
					loading={loading}
					defaultValues={savedConfig}
				/>
				<ConfirmDialog
					open={Boolean(config)}
					onConfirm={handleSubmit}
					onClose={onClose}
					loading={loading}
				/>
			</Grid>
		</ErrorBoundary>
	);
}
