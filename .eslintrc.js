module.exports = {
	root: true,
	env: {
		meteor: true,
		node: true,
	},
	globals: {
		NODE_ENV: true,
	},
	extends: [
		'bluedrop',
		'bluedrop/config/node',
	],
	parserOptions: {
		sourceType: 'module',
		allowImportExportEverywhere: true,
	},
	settings: {
		'import/resolver': 'meteor',
		react: {
			version: '18.0',
		},
	},
	rules: {
		'node/no-missing-import': ['error', {
			allowModules: ['meteor'],
		}],
	},
};
