import Collection from '../../api/camera';
import {callMethod} from '../../api/methods';
import METHODS from '../../methods';
import Content from './Content';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
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

	const handleDiscover = React.useCallback(async () => {
		try {
			setProcessing(true);
			setPending(false);
			setError(null);
			const result = await callMethod(METHODS.CAMERA_DISCOVER);
			setDiscovered(result);
		}
		catch (err) {
			setError(err);
			setDiscovered([]);
		}
		setProcessing(false);
	}, []);

	const list = React.useMemo(() => {
		if (filter) {
			return discovered.filter(({hostname}) => !added.includes(hostname));
		}
		return discovered;
	}, [discovered, filter, added]);

	return (
		<Grid container direction="column" rowGap={3}>
			<Grid item>
				<Button onClick={handleDiscover} disabled={processing}>Discover new camera</Button>
			</Grid>
			<FormControlLabel control={<Checkbox onClick={handleFilter} />} label="Show added" />
			<Content pending={pending} processing={processing} error={error} list={list} added={added} />
		</Grid>
	);
}
