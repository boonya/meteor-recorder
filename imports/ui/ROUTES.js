const home = '/';
const addDevice = '/add';
const editDevice = '/edit/:deviceId';
const addDeviceWithLANDiscover = `${addDevice}/discover`;
const addDeviceWithONVIF = `${addDevice}/onvif`;

export default {
	home,
	addDevice,
	editDevice,
	addDeviceWithLANDiscover,
	addDeviceWithONVIF,
};

/**
 * @param {string} route
 * @param {string} base
 * @returns {string}
 */
export function getRelativePath(route, base) {
	const [, last] = route.split(base);
	return last.replace(/^\//u, '');
}
