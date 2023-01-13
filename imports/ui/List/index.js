import Item from './Item';
import CameraCollection from '../../collections/camera';
import MuiList from '@mui/material/List';
import {useTracker} from 'meteor/react-meteor-data';
import React from 'react';

export default function List() {
	const list = useTracker(() => CameraCollection.find().fetch());

	return (
		<MuiList>
			{list.map((cam) => <Item key={cam._id} {...cam} />)}
		</MuiList>
	);
}
