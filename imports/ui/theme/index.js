import createComponents from './components';
import createPalette from './palette';
import createTypography from './typography';
import {createTheme} from '@mui/material';
// eslint-disable-next-line import/no-unassigned-import
import '@fontsource/pangolin/index.css';

export default (...args) => createTheme({
	palette: createPalette(...args),
	typography: createTypography(...args),
	components: createComponents(...args),
});
