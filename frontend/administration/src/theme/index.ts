import { createTheme } from '@mui/material';
import { THEME_OPTIONS } from 'src/constants';
import typography from './typography';

const { DARK_THEME, LIGHT_THEME } = THEME_OPTIONS;

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
    palette: {
      mode: DARK_THEME
    },
    typography
  }
];

const createMuiTheme = (config?: any) => {
  const options = themeOptions.find((option) => option.mode === LIGHT_THEME);

  return createTheme({ ...options, ...config });
};

export default createMuiTheme;
