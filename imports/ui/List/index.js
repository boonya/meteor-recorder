import Collection from '../../api/camera';
import Item from './Item';
import {useTracker} from 'meteor/react-meteor-data';
import React from 'react';

export default function List() {
	const list = useTracker(() => Collection.find().fetch());

	return (
		<ul>
			{list.map((cam) => <li key={cam._id}><Item {...cam} /></li>)}
		</ul>
	);
}
