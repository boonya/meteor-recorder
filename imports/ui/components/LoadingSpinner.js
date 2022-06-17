import styled from '@emotion/styled';
import MuiBackdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Portal from '@mui/material/Portal';
import PropTypes from 'prop-types';
import React, {useRef} from 'react';

// const useStyles = makeStyles(({zIndex}) => ({
// 	root: {
// 		zIndex: zIndex.modal + 1,
// 	},
// 	relative: {
// 		position: 'relative',
// 	},
// 	absolute: {
// 		position: 'absolute',
// 	},
// });

const Backdrop = styled(MuiBackdrop)`
	z-index: ${({theme}) => theme.zIndex.modal + 1}
`;

// TODO: "local" variant is not implemented yet.
export default function LoadingSpinner({local, BackdropProps, ...props}) {
	// const classes = useStyles(props);
	const ref = useRef(null);

	// useEffect(() => {
	// 	if (!local) {
	// 		return () => null;
	// 	}

	// 	const parentNode = ref?.current?.parentNode;

	// 	/* istanbul ignore if  */
	// 	if (!parentNode) {
	// 		return () => null;
	// 	}

	// 	parentNode.classList.add(classes.relative);

	// 	return () => {
	// 		parentNode.classList.remove(classes.relative);
	// 	};
	// }, [ref, local, classes.relative]);

	return (
		<Portal disablePortal={local}>
			<Backdrop
				open
				unmountOnExit
				ref={ref}
				// className={clsx(classes.root, {
				// 	[classes.absolute]: local,
				// })}
				{...BackdropProps}
			>
				<CircularProgress {...props} />
			</Backdrop>
		</Portal>
	);
}

LoadingSpinner.propTypes = {
	/**
	 * Properties spread to MuiBackdrop component
	 */
	BackdropProps: PropTypes.shape(),
	/**
	 * Wrapping the circular spinner to a component.
	 */
	local: PropTypes.bool,
};

LoadingSpinner.defaultProps = {
	BackdropProps: undefined,
	local: false,
};
