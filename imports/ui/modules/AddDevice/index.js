import ErrorBoundary from '../../ErrorBoundary';
import NotFound from '../../NotFound';
import ROUTES, {getRelativePath} from '../../ROUTES';
import React, {lazy} from 'react';
import {Routes, Route} from 'react-router-dom';

const ChooseMethod = lazy(() => import(/* webpackChunkName: "modules/AddDevice/ChooseMethod" */'./ChooseMethod'));
const Onvif = lazy(() => import(/* webpackChunkName: "modules/AddDevice/Onvif" */'./Onvif'));
const Discover = lazy(() => import(/* webpackChunkName: "modules/AddDevice/Discover" */'./Discover'));

export default function AddDevice() {
	return (
		<ErrorBoundary>
			<Routes>
				<Route index element={<ChooseMethod />} />
				<Route
					path={getRelativePath(ROUTES.addDeviceWithLANDiscover, ROUTES.addDevice)}
					element={<Discover />}
				/>
				<Route
					path={getRelativePath(ROUTES.addDeviceWithONVIF, ROUTES.addDevice)}
					element={<Onvif />}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</ErrorBoundary>
	);
}
