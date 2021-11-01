import Collection from '../../api/camera';
import {useTracker} from 'meteor/react-meteor-data';
import React from 'react';

export default function AddManually() {
	const added = useTracker(() => Collection.find().fetch().map(({hostname}) => hostname));

	return (
		<div>
			<button type="button">Add manually</button>
		</div>
	);
}
