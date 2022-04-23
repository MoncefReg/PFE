import { createTheme } from '@mui/material';
import { DARK_THEME, LIGHT_THEME } from 'src/constants';
import typography from './typography';

const themeOptions = [
  {
    mode: LIGHT_THEME,
    components: {},
    palette: {
      mode: LIGHT_THEME
    },
    typography
  },
  {
    mode: DARK_THEME,
    components: {},
    palette: {},
    typography
  }
];

const createMuiTheme = (config?: any) => {
  const options = themeOptions.find((option) => option.mode === LIGHT_THEME);

  return createTheme({ ...options, ...config });
};

export default createMuiTheme;
