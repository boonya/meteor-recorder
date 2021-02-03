import METHODS from '../../methods';
import {logError} from '../../utils/logger';
import PropTypes from 'prop-types';
import React from 'react';

export default function Item({hostname, port, path, uri, added}) {
	const [processing, setProcessing] = React.useState(false);

	const handleAdd = React.useCallback((e) => {
		e.preventDefault();
		const title = e.target.elements.title.value.trim() || hostname;
		setProcessing(true);
		// eslint-disable-next-line promise/prefer-await-to-callbacks
		Meteor.call(METHODS.CAMERA_CREATE, title, hostname, port, path, uri, (err) => {
			if (err) { logError('Failed to create camera.')(err); }
			setProcessing(false);
		});
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

Item.propTypes = {
	added: PropTypes.bool,
	hostname: PropTypes.string.isRequired,
	path: PropTypes.string.isRequired,
	port: PropTypes.string.isRequired,
	uri: PropTypes.object.isRequired,
};

Item.defaultProps = {
	added: false,
};
