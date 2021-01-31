import React from 'react'
import {useTracker} from 'meteor/react-meteor-data';
import Collection from '../../api/camera';
import Item from './Item';

export default function List() {
	const list = useTracker(() => Collection.find().fetch());

	return (
		<ul>
			{list.map((cam) => <li key={cam._id}><Item {...cam} /></li>)}
		</ul>
	);
}
