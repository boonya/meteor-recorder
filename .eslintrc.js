module.exports = {
	root: true,
	env: {
		meteor: true,
		node: true,
	},
	extends: [
		'bluedrop',
		'bluedrop/config/node',
	],
	globals: {
		NODE_ENV: true,
	},
	parserOptions: {
		sourceType: 'module',
		allowImportExportEverywhere: true,
	},
	settings: {
		'import/resolver': 'meteor',
		react: {
			version: '17.0',
		},
	},
	rules: {
		'node/no-missing-import': ['error', {
			allowModules: ['meteor'],
		}],
	},
};
