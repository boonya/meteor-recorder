import styled from '@emotion/styled';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import React from 'react';

const Container = styled(Grid)`
	padding: ${({theme}) => theme.spacing(3)};
	height: 100%;
`;

export default function RootLayout({children, ...props}) {
	return (
		<Container
			container
			direction="column"
			rowGap={3}
			component="main"
			{...props}
		>
			{children}
		</Container>
	);
}

RootLayout.propTypes = {
	children: PropTypes.node.isRequired,
};
