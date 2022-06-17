import ErrorBoundary from './ErrorBoundary';
import NotFound from './NotFound';
import ROUTES from './ROUTES';
import RootLayout from './RootLayout';
import LoadingSpinner from './components/LoadingSpinner';
import createTheme from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import {ThemeProvider} from '@mui/material/styles';
import {SnackbarProvider} from 'notistack';
import React, {lazy, Suspense} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

const MainScreen = lazy(() => import(/* webpackChunkName: "modules/MainScreen" */'./modules/MainScreen'));
const AddDevice = lazy(() => import(/* webpackChunkName: "modules/AddDevice" */'./modules/AddDevice'));

export function App() {
	return (
		<ThemeProvider theme={createTheme()}>
			<CssBaseline />
			<ErrorBoundary>
				<Suspense fallback={<LoadingSpinner />}>
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
				</Suspense>
			</ErrorBoundary>
		</ThemeProvider>
	);
}
