import NotFound from '../../NotFound';
import ROUTES, {getRelativePath} from '../../ROUTES';
import ChooseMethod from './ChooseMethod';
import Discover from './Discover';
import Onvif from './Onvif';
import React from 'react';
import {Routes, Route} from 'react-router-dom';

export default function AddDevice() {
	return (
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
	);
}
