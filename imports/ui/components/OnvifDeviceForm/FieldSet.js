import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import React, {useCallback} from 'react';
import {useFormContext} from 'react-hook-form';

export const FIELD_NAME = {
	label: 'label',
	hostname: 'hostname',
	port: 'port',
	username: 'username',
	password: 'password',
};

export default function FieldSet({loading}) {
	const {register, formState, getValues, watch} = useFormContext();

	watch();

	const hasError = useCallback((name) => Boolean(formState.errors[name]), [formState.errors]);

	const getError = useCallback((name) => formState.errors[name]?.message, [formState.errors]);

	const hasValue = useCallback((name) => {
		const values = getValues(name);
		return Boolean(typeof values === 'string' ? values.trim() : values);
	}, [getValues]);

	return (
		<>
			<TextField
				label="Label"
				{...register(FIELD_NAME.label, {
					required: 'Label is mandatory.',
				})}
				disabled={loading}
				error={hasError(FIELD_NAME.label)}
				helperText={getError(FIELD_NAME.label)}
				InputLabelProps={{shrink: hasValue(FIELD_NAME.label)}}
			/>
			<TextField
				label="Hostname"
				{...register(FIELD_NAME.hostname, {
					required: 'Hostname is mandatory.',
				})}
				disabled={loading}
				placeholder="192.168.1.10"
				error={hasError(FIELD_NAME.hostname)}
				helperText={getError(FIELD_NAME.hostname)}
				InputLabelProps={{shrink: hasValue(FIELD_NAME.hostname)}}
			/>
			<TextField
				label="Port"
				type="number"
				{...register(FIELD_NAME.port, {
					required: 'Port number is mandatory.',
				})}
				disabled={loading}
				placeholder="8899"
				error={hasError(FIELD_NAME.port)}
				helperText={getError(FIELD_NAME.port)}
				InputLabelProps={{shrink: hasValue(FIELD_NAME.port)}}
			/>
			<TextField
				label="Username"
				{...register(FIELD_NAME.username, {
					required: 'Username is mandatory.',
				})}
				disabled={loading}
				error={hasError(FIELD_NAME.username)}
				helperText={getError(FIELD_NAME.username)}
				InputLabelProps={{shrink: hasValue(FIELD_NAME.username)}}
			/>
			<TextField
				label="Password"
				type="password"
				{...register(FIELD_NAME.password)}
				disabled={loading}
				error={hasError(FIELD_NAME.password)}
				helperText={getError(FIELD_NAME.password)}
				InputLabelProps={{shrink: hasValue(FIELD_NAME.password)}}
			/>
		</>
	);
}

FieldSet.propTypes = {
	loading: PropTypes.bool,
};

FieldSet.defaultProps = {
	loading: false,
};
