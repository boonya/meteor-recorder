import React from 'react'
import METHODS from '../../methods';

export default function Item({hostname, port, path, uri, added}) {
	const [processing, setProcessing] = React.useState(false);

	const handleAdd = React.useCallback((e) => {
		e.preventDefault();
		const title = e.target.elements.title.value.trim() || hostname;
		setProcessing(true);
		Meteor.call(METHODS.CAMERA_CREATE, title, hostname, port, path, uri, (err) => {
			if (err) console.error(err);
			setProcessing(false);
		});
	}, []);

	return (
		<form onSubmit={handleAdd}>
			{hostname}{' / '}
			{added ? 'added' : 'not added'}{' / '}
			<button type="submit" disabled={processing || added}>Add</button>{' / '}
			<label>
				Title:
				<input type="text" name="title" placeholder={hostname} disabled={processing || added} />
			</label>
		</form>
	);
}
