import MyDiscover from '../../Discover';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';

export default function Discover(props) {
	return (
		<Grid {...props}>
			<Typography variant="h1">Discover</Typography>
			<MyDiscover />
		</Grid>
	);
}
