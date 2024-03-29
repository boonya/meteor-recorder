import AppBar from './AppBar';
import ErrorBoundary from './ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import styled from '@emotion/styled';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import React, {useMemo, Suspense} from 'react';
import {Outlet} from 'react-router-dom';

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
		<ErrorBoundary>
			<Grid {...props}>
				<AppBar />
				<Main>
					<ErrorBoundary>
						<Suspense fallback={<LoadingSpinner local />}>
							{content}
						</Suspense>
					</ErrorBoundary>
				</Main>
			</Grid>
		</ErrorBoundary>
	);
}

RootLayout.propTypes = {
	children: PropTypes.node,
};

RootLayout.defaultProps = {
	children: <Outlet />,
};
