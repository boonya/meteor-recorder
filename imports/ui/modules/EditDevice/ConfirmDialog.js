import ActionButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import MuiDialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import React from 'react';

export default function ConfirmDialog({onConfirm, loading, ...props}) {
	return (
		<MuiDialog {...props}>
			<DialogTitle>Save changes</DialogTitle>
			<DialogContent>
				If you really want to save the changes press Add.
			</DialogContent>
			<DialogActions>
				<Button
					variant="outlined"
					onClick={props.onClose}
					disabled={loading}
				>
					Cancel
				</Button>
				<ActionButton
					onClick={onConfirm}
					loading={loading}
				>
					Add
				</ActionButton>
			</DialogActions>
		</MuiDialog>
	);
}

ConfirmDialog.propTypes = {
	loading: PropTypes.bool,
	onClose: PropTypes.func.isRequired,
	onConfirm: PropTypes.func.isRequired,
};

ConfirmDialog.defaultProps = {
	loading: false,
};
