import ErrorBoundary from '../../ErrorBoundary';
import List from '../../List';
import Grid from '@mui/material/Grid';
import React from 'react';

export default function MainScreen(props) {
	return (
		<ErrorBoundary>
			<Grid {...props}>
				<List />
			</Grid>
		</ErrorBoundary>
	);
}
