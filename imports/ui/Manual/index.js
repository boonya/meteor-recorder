import Form from './Form';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import React, {useState, useCallback} from 'react';

export default function Manual() {
	const [show, setShow] = useState(false);

	const showForm = useCallback(() => setShow(true), []);
	const hideForm = useCallback(() => setShow(false), []);

	const ToggleForm = useCallback(() => {
		if (show) {
			return <Button onClick={hideForm}>Hide the form</Button>;
		}
		return <Button onClick={showForm}>Add camera manually</Button>;
	}, [hideForm, show, showForm]);

	return (
		<Grid container direction="column" rowGap={3}>
			<Grid item>
				<ToggleForm />
			</Grid>
			{show && <Form />}
		</Grid>
	);
}
