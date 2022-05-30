export default () => ({
	MuiCssBaseline: {
		styleOverrides: {
			'html, body, #root': {
				padding: 0,
				margin: 0,
				height: '100%',
			},
		},
	},
	MuiButton: {
		defaultProps: {
			variant: 'contained',
		},
	},
	MuiIconButton: {
		defaultProps: {
			color: 'primary',
		},
	},
	MuiTextField: {
		defaultProps: {
			fullWidth: true,
			margin: 'none',
		},
	},
});
