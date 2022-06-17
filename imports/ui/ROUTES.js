const home = '/';
const addDevice = '/add';
const addDeviceWithLANDiscover = `${addDevice}/discover`;
const addDeviceWithONVIF = `${addDevice}/onvif`;

export default {
	home,
	addDevice,
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
