const presets = [
	'@babel/preset-env',
	['@babel/preset-react', {runtime: 'automatic'}],
];

const plugins = [
	'@babel/plugin-transform-runtime',
];

module.exports = {
	presets,
	plugins,
};
