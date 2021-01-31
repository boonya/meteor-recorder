import React from 'react'
import Item from './Item';

export default function Content({pending, processing, error, list, added}) {
	if (pending) {
		return null;
	}

	if (processing) {
		return <p>processing</p>;
	}

	if (error) {
		return <pre>{JSON.stringify(error, null, "\t")}</pre>;
	}

	if (list.length === 0) {
		return <p>Nothing</p>;
	}

	return (
		<ul>
			{list.map((cam) => <li key={cam.hostname}><Item {...cam} added={added.includes(cam.hostname)} /></li>)}
		</ul>
	);
}
