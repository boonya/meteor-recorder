import Item from './Item';
import PropTypes from 'prop-types';
import React from 'react';

export default function Content({pending, processing, error, list, added}) {
	if (pending) {
		return null;
	}

	if (processing) {
		return <p>processing</p>;
	}

	if (error) {
		return <pre>{JSON.stringify(error, null, '\t')}</pre>;
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

Content.propTypes = {
	added: PropTypes.arrayOf(PropTypes.string).isRequired,
	error: PropTypes.instanceOf(Error),
	list: PropTypes.arrayOf(PropTypes.shape({hostname: PropTypes.string.isRequired})).isRequired,
	pending: PropTypes.bool,
	processing: PropTypes.bool,
};

Content.defaultProps = {
	error: undefined,
	pending: false,
	processing: false,
};
