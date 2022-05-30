import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import React from 'react';
import {useForm} from 'react-hook-form';

export default function Form(props) {
	const {register, handleSubmit, formState} = useForm({defaultValues: {
		port: 8899,
		username: 'admin',
		password: '',
	}});
	const onSubmit = (data) => console.log('onSubmit:', data);

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
				error={Boolean(formState.errors.hostname)}
				helperText={formState.errors.hostname?.message}
			/>
			<TextField
				label="Port"
				type="number"
				{...register('port', {
					required: 'Port is mandatory.',
				})}
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
				<Button type="submit">Submit</Button>
			</Grid>
		</Grid>
	);
}
