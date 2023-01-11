import {callMethod} from '../../../api/methods';
import METHODS from '../../../methods';
import {logError} from '../../../utils/logger';
import {useSnackbar} from 'notistack';
import {useCallback, useState} from 'react';

export default function useSaveConfig() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	const {enqueueSnackbar} = useSnackbar();

	const save = useCallback(async (id, {label, hostname, port, username, password}) => {
		try {
			setLoading(true);
			await callMethod(METHODS.CAMERA_UPDATE, id, label, hostname, port, username, password);
		}
		catch (err) {
			enqueueSnackbar('Failed to update the device.', {variant: 'error'});
			logError('Failed to update the device.')(err.reason);
			setError(err);
			throw err;
		}
		finally {
			setLoading(false);
		}
		return undefined;
	}, [enqueueSnackbar]);

	return [save, {loading, error}];
}
