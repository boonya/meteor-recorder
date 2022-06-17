import ROUTES from '../../ROUTES';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import {Link} from 'react-router-dom';

export default function ChooseMethod(props) {
	return (
		<Grid {...props}>
			<Typography variant="h1">Add Device</Typography>
			<Typography variant="h2">Choose a method</Typography>
			<Grid container rowGap={2} columnGap={2}>
				<Button
					component={Link}
					to={ROUTES.discover}
				>
					Discover
				</Button>
				<Button
					component={Link}
					to={ROUTES.onvif}
				>
					ONVIF
				</Button>
			</Grid>
		</Grid>
	);
}
