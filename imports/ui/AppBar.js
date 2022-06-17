import ROUTES from './ROUTES';
import styled from '@emotion/styled';
import AddIcon from '@mui/icons-material/Add';
import MuiAppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import MuiToolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import {Link} from 'react-router-dom';

const Title = styled(Typography)`
	text-decoration: none;
	:hover {
		text-decoration: underline;
	}
`;

const Toolbar = styled(MuiToolbar)`
	column-gap: ${({theme}) => theme.spacing(2)};
`;

export default function AppBar() {
	return (
		<MuiAppBar position="static" color="primary" enableColorOnDark>
			<Toolbar>
				<Title
					variant="h3"
					color="inherit"
					noWrap
					component={Link}
					to={ROUTES.home}
				>
					IP Web Cams Recorder
				</Title>
				<Button
					component={Link}
					to={ROUTES.addDeviceWithONVIF}
					variant="text"
					color="inherit"
					startIcon={<AddIcon />}
				>
					Add new device
				</Button>
			</Toolbar>
		</MuiAppBar>
	);
}
