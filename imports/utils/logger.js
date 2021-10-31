import {ENV} from '../config';

/* eslint-disable no-console */
const logFunction = (method) => {
	return (...args) => {
	  return (...additional) => {
			if (!ENV.DEBUG) {
				return;
			}
			if (additional.length) {
				console.groupCollapsed(...args);
				console[method](...additional);
				console[method]('');
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
