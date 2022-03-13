import {callMethod} from '../../api/methods';
import METHODS from '../../methods';
import {logError} from '../../utils/logger';
import PropTypes from 'prop-types';
import React from 'react';

export default function Item({hostname, port, path, uri, added}) {
	const [processing, setProcessing] = React.useState(false);

	const handleAdd = React.useCallback(async (e) => {
		try {
			e.preventDefault();
			const title = e.target.elements.title.value.trim() || hostname;
			setProcessing(true);
			await callMethod(METHODS.CAMERA_CREATE, title, hostname, port, path, uri);
		}
		catch (err) {
			logError('Failed to create camera.')(err);
		}
		setProcessing(false);
	}, [hostname, path, port, uri]);

	return (
		<form onSubmit={handleAdd}>
			{hostname}{' / '}
			{added ? 'added' : 'not added'}{' / '}
			<button type="submit" disabled={processing || added}>Add</button>{' / '}
			<label>
				Title: <input type="text" name="title" placeholder={hostname} disabled={processing || added} />
			</label>
		</form>
	);
}

const URI_SHAPE = {
	device: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])).isRequired,
};

Item.propTypes = {
	added: PropTypes.bool,
	hostname: PropTypes.string.isRequired,
	path: PropTypes.string.isRequired,
	port: PropTypes.string.isRequired,
	uri: PropTypes.shape(URI_SHAPE).isRequired,
};

Item.defaultProps = {
	added: false,
};
