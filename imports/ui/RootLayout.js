import styled from '@emotion/styled';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React, {useMemo} from 'react';

const Main = styled('main')`
	display: flex;
	flex-direction: column;
	row-gap: ${({theme}) => theme.spacing(3)};
	padding: ${({theme}) => theme.spacing(3)};
`;

export default function RootLayout({children, ...props}) {
	const content = useMemo(() => {
		if (Array.isArray(children)) {
			// eslint-disable-next-line react/jsx-key
			return children.map((child) => <Grid>{child}</Grid>);
		}
		return children;
	}, [children]);

	return (
		<Grid {...props}>
			<AppBar position="static" color="primary" enableColorOnDark>
				<Toolbar>
					<Typography component="h1" variant="h2">
						IP Web Cams Recorder
					</Typography>
				</Toolbar>
			</AppBar>
			<Main>{content}</Main>
		</Grid>
	);
}

RootLayout.propTypes = {
	children: PropTypes.node.isRequired,
};
