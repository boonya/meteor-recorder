export async function callMethod(method, ...args) {
	return new Promise((resolve, reject) => {
		// eslint-disable-next-line promise/prefer-await-to-callbacks
		Meteor.call(method, ...args, (err, result) => {
			if (err) {
				return reject(err);
			}
			return resolve(result);
		});
	});
}
