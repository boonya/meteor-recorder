import {callMethod} from '../../../api/methods';
import METHODS from '../../../methods';
import {logError} from '../../../utils/logger';
import {useSnackbar} from 'notistack';
import {useCallback, useState} from 'react';

export default function useFetchConfig() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	const [data, setData] = useState();
	const {enqueueSnackbar} = useSnackbar();

	const fetch = useCallback(async (deviceId) => {
		try {
			setLoading(true);
			const {label, hostname, port, username} = await callMethod(METHODS.CAMERA_GET_CONFIG, deviceId);
			setData({label, hostname, port, username});
			return {label, hostname, port, username};
		}
		catch (err) {
			enqueueSnackbar('Failed to fetch the device config.', {variant: 'error'});
			logError('Failed to fetch the device config.')(err.reason);
			setError(err);
			return undefined;
		}
		finally {
			setLoading(false);
		}
	}, [enqueueSnackbar]);

	return [fetch, {loading, data, error}];
}
