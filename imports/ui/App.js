import Discover from './Discover';
import List from './List';
import Manual from './Manual';
import RootLayout from './RootLayout';
import createTheme from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import React from 'react';

export function App() {
	return (
		<ThemeProvider theme={createTheme()}>
			<CssBaseline />
			<RootLayout>
				<List />
				<Discover />
				<Manual />
			</RootLayout>
		</ThemeProvider>
	);
}
