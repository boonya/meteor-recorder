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
	MuiLoadingButton: {
		defaultProps: {
			variant: 'contained',
		},
	},
	MuiIconButton: {
		defaultProps: {
			color: 'primary',
		},
	},
	MuiFab: {
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
	MuiTooltip: {
		defaultProps: {
			arrow: true,
		},
	},
});
