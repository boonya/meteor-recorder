import {ENV} from '../config';

/* eslint-disable no-console */
const logFunction = (method) => {
	return (...args) => {
		return (...additional) => {
			if (!ENV.SHOW_LOGS) {
				return;
			}
			if (additional.length) {
				console.groupCollapsed(...args);
				console[method](...additional);
				console.groupEnd();
			}
			else {
				console[method](...args);
			}
		};
	};
};

export const logInfo = logFunction('info');
export const logWarn = logFunction('warn');
export const logError = logFunction('error');
/* eslint-enable no-console */
