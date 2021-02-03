import Collection from '../../api/camera';
import METHODS from '../../methods';
import Content from './Content';
import {useTracker} from 'meteor/react-meteor-data';
import React from 'react';

export default function Discover() {
	const [pending, setPending] = React.useState(true);
	const [processing, setProcessing] = React.useState(false);
	const [error, setError] = React.useState(null);
	const [filter, setFilter] = React.useState(true);
	const [discovered, setDiscovered] = React.useState([]);

	const added = useTracker(() => Collection.find().fetch().map(({hostname}) => hostname));

	const handleFilter = React.useCallback(() => {
		setFilter(!filter);
	}, [filter]);

	const handleDiscover = React.useCallback(() => {
		setProcessing(true);
		setPending(false);
		// eslint-disable-next-line promise/prefer-await-to-callbacks
		Meteor.call(METHODS.CAMERA_DISCOVER, (err, result) => {
			if (err) {
				setError(err);
				setDiscovered([]);
			}
			else {
				setError(null);
				setDiscovered(result);
			}
			setProcessing(false);
		});
	}, []);

	const list = React.useMemo(() => {
		if (filter) {
			return discovered.filter(({hostname}) => !added.includes(hostname));
		}
		return discovered;
	}, [discovered, filter, added]);

	return (
		<div>
			<button type="button" onClick={handleDiscover} disabled={processing}>Discover new camera</button>
			<label>
				Show added <input type="checkbox" onClick={handleFilter} />
			</label>
			<div>
				<Content pending={pending} processing={processing} error={error} list={list} added={added} />
			</div>
		</div>
	);
}
