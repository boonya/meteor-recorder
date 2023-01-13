import FieldSet, {FIELD_NAME} from './FieldSet';
import Button from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import React, {useLayoutEffect} from 'react';
import {useForm, FormProvider} from 'react-hook-form';

export default function OnvifDeviceForm({onSubmit, loading, defaultValues, ...props}) {
	const form = useForm({defaultValues});

	useLayoutEffect(() => {
		form.reset(defaultValues);
	}, [defaultValues, form]);

	return (
		<Grid
			container
			direction="column"
			rowGap={3}
			component="form"
			noValidate
			onSubmit={form.handleSubmit(onSubmit)}
			{...props}
		>
			<FormProvider {...form}>
				<FieldSet loading={loading} />
			</FormProvider>
			<Grid container>
				<Button type="submit" loading={loading} loadingIndicator="Waiting...">Save</Button>
			</Grid>
		</Grid>
	);
}

const DEFAULT_VALUES_SHAPE = {
	[FIELD_NAME.label]: PropTypes.string.isRequired,
	[FIELD_NAME.hostname]: PropTypes.string.isRequired,
	[FIELD_NAME.port]: PropTypes.number.isRequired,
	[FIELD_NAME.username]: PropTypes.string.isRequired,
	[FIELD_NAME.password]: PropTypes.string,
};

OnvifDeviceForm.propTypes = {
	defaultValues: PropTypes.shape(DEFAULT_VALUES_SHAPE),
	loading: PropTypes.bool,
	onSubmit: PropTypes.func.isRequired,
};

const DEFAULT_VALUES = {
	[FIELD_NAME.label]: '',
	[FIELD_NAME.hostname]: '',
	[FIELD_NAME.port]: 8899,
	[FIELD_NAME.username]: 'admin',
	[FIELD_NAME.password]: '',
};

OnvifDeviceForm.defaultProps = {
	defaultValues: DEFAULT_VALUES,
	loading: false,
};
