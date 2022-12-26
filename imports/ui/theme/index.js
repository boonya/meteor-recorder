import createComponents from './components';
import createPalette from './palette';
import createTypography from './typography';
import {createTheme} from '@mui/material';

export default (...args) => createTheme({
	palette: createPalette(...args),
	typography: createTypography(...args),
	components: createComponents(...args),
});
