import React from 'react'
import Content from './Content';
import { useTracker } from 'meteor/react-meteor-data';
import Collection from '../../api/camera';
import METHODS from '../../methods';

export default function Discover() {
	const [pending, setPending] = React.useState(true);
	const [processing, setProcessing] = React.useState(false);
	const [error, setError] = React.useState(null);
	const [filter, setFilter] = React.useState(true);
	const [response, setResponse] = React.useState([]);

	const added = useTracker(() => Collection.find().fetch().map(({hostname}) => hostname));

	const handleFilter = React.useCallback(() => {
		setFilter(!filter);
	}, [filter]);

	const handleDiscover = React.useCallback(() => {
		setProcessing(true);
		setPending(false);
		Meteor.call(METHODS.CAMERA_DISCOVER, (err, response) => {
			if (err) {
				setError(err);
				setResponse([]);
			}
			else {
				setError(null);
				setResponse(response);
			}
			setProcessing(false);
		});
	}, []);

	const list = React.useMemo(() => {
		if (filter) {
			return response.filter(({hostname}) => !added.includes(hostname));
		}
		return response;
	}, [response, filter, added]);

	return (
		<div>
			<button onClick={handleDiscover} disabled={processing}>Discover new camera</button>
			<label>
				Show added
				<input type="checkbox" onClick={handleFilter} />
			</label>
			<div>
				<Content pending={pending} processing={processing} error={error} list={list} added={added} />
			</div>
		</div>
	)
}
