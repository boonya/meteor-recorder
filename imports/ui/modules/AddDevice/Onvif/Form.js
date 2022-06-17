import Button from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import React from 'react';
import {useForm} from 'react-hook-form';

export default function Form({onSubmit, loading, ...props}) {
	const {register, handleSubmit, formState} = useForm({defaultValues: {
		port: 8899,
		username: 'admin',
		password: '',
	}});

	return (
		<Grid
			container
			direction="column"
			rowGap={3}
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			{...props}
		>
			<TextField
				label="Title"
				{...register('title', {
					required: 'Title is mandatory.',
				})}
				error={Boolean(formState.errors.title)}
				helperText={formState.errors.title?.message}
			/>
			<TextField
				label="Hostname"
				{...register('hostname', {
					required: 'Hostname is mandatory.',
				})}
				placeholder="192.168.1.10"
				error={Boolean(formState.errors.hostname)}
				helperText={formState.errors.hostname?.message}
			/>
			<TextField
				label="Port"
				type="number"
				{...register('port', {
					required: 'Port is mandatory.',
				})}
				placeholder="8899"
				error={Boolean(formState.errors.port)}
				helperText={formState.errors.port?.message}
			/>
			<TextField
				label="Username"
				{...register('username', {
					required: 'Username is mandatory.',
				})}
				error={Boolean(formState.errors.username)}
				helperText={formState.errors.username?.message}
			/>
			<TextField
				label="Password"
				{...register('password')}
				error={Boolean(formState.errors.password)}
				helperText={formState.errors.password?.message}
			/>
			<Grid item>
				<Button type="submit" loading={loading} loadingIndicator="Waiting...">Connect</Button>
			</Grid>
		</Grid>
	);
}

Form.propTypes = {
	loading: PropTypes.bool,
	onSubmit: PropTypes.func.isRequired,
};

Form.defaultProps = {
	loading: false,
};
