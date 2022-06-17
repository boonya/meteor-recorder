import NotFound from './NotFound';
import ROUTES from './ROUTES';
import RootLayout from './RootLayout';
import AddDevice from './modules/AddDevice';
import MainScreen from './modules/MainScreen';
import createTheme from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import {SnackbarProvider} from 'notistack';
import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

export function App() {
	return (
		<ThemeProvider theme={createTheme()}>
			<CssBaseline />
			<SnackbarProvider
				maxSnack={5}
				anchorOrigin={{vertical: 'top', horizontal: 'right'}}
			>
				<BrowserRouter>
					<Routes>
						<Route element={<RootLayout />}>
							<Route index element={<MainScreen />} />
							<Route path={`${ROUTES.addDevice}/*`} element={<AddDevice />} />
							<Route path="*" element={<NotFound />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</SnackbarProvider>
		</ThemeProvider>
	);
}
