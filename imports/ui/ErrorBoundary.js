import {logError} from '../utils/logger';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

// eslint-disable-next-line react/require-optimization
export default class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = {hasError: false};
	}

	static getDerivedStateFromError() {
		return {hasError: true};
	}

	componentDidCatch(error, errorInfo) {
		logError('An error occurred.')(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return this.props.fallback;
		}
		return this.props.children;
	}
}

// eslint-disable-next-line react/static-property-placement
ErrorBoundary.propTypes = {
	children: PropTypes.node.isRequired,
	fallback: PropTypes.node,
};

// eslint-disable-next-line react/static-property-placement
ErrorBoundary.defaultProps = {
	fallback: <Typography variant="h1">An error occurred</Typography>,
};
