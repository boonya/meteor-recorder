import {callMethod} from '../../../../api/methods';
import METHODS from '../../../../methods';
import {logError} from '../../../../utils/logger';
import {useSnackbar} from 'notistack';
import {useCallback, useState} from 'react';

export default function useConnectDevice() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	const {enqueueSnackbar} = useSnackbar();

	const connect = useCallback(async ({hostname, port, username, password}) => {
		try {
			setLoading(true);
			await callMethod(METHODS.CAMERA_CONNECT, hostname, port, username, password);
		}
		catch (err) {
			enqueueSnackbar('Failed to connect to the device.', {variant: 'error'});
			logError('Failed to connect to the device.')(err.reason);
			setError(err);
			throw err;
		}
		finally {
			setLoading(false);
		}
		return undefined;
	}, [enqueueSnackbar]);

	return [connect, {loading, error}];
}
