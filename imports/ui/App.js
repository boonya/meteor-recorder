import Discover from './Discover';
import List from './List';
import RootLayout from './RootLayout';
import createTheme from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import {ThemeProvider} from '@mui/material/styles';
import React from 'react';

export function App() {
	return (
		<ThemeProvider theme={createTheme()}>
			<CssBaseline />
			<RootLayout>
				<Typography variant="h1">IP Web Cams Recorder</Typography>
				<List />
				<Discover />
			</RootLayout>
		</ThemeProvider>
	);
}
