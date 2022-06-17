const home = '/';
const addDevice = '/add';
const discover = `${addDevice}/discover`;
const onvif = `${addDevice}/onvif`;

export default {home, addDevice, discover, onvif};

/**
 * @param {string} route
 * @param {string} base
 * @returns {string}
 */
export function getRelativePath(route, base) {
	const [, last] = route.split(base);
	return last.replace(/^\//u, '');
}
