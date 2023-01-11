import {callMethod} from '../../../../api/methods';
import METHODS from '../../../../methods';
import {logError} from '../../../../utils/logger';
import {useSnackbar} from 'notistack';
import {useCallback, useState} from 'react';

export default function useCreateCamera() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();
	const {enqueueSnackbar} = useSnackbar();

	const create = useCallback(async ({label, hostname, port, username, password}) => {
		try {
			setLoading(true);
			await callMethod(METHODS.CAMERA_CREATE, label, hostname, port, username, password);
		}
		catch (err) {
			enqueueSnackbar('Failed to add device.', {variant: 'error'});
			logError('Failed to add device.')(err.reason);
			setError(err);
			throw err;
		}
		finally {
			setLoading(false);
		}
		return undefined;
	}, [enqueueSnackbar]);

	return [create, {loading, error}];
}
