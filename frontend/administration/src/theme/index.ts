import { createTheme } from '@mui/material';
import { THEME_OPTIONS } from 'src/constants';
import typography from './typography';

const { DARK_THEME, LIGHT_THEME } = THEME_OPTIONS;

const softShadows = [
  'none',
  '0px 1px 2px rgba(0, 0, 0, 0.24)',
  '0px 1px 2px rgba(0, 0, 0, 0.24)',
  '0px 1px 4px rgba(0, 0, 0, 0.24)',
  '0px 1px 5px rgba(0, 0, 0, 0.24)',
  '0px 1px 6px rgba(0, 0, 0, 0.24)',
  '0px 2px 6px rgba(0, 0, 0, 0.24)',
  '0px 3px 6px rgba(0, 0, 0, 0.24)',
  '0px 4px 6px rgba(0, 0, 0, 0.24)',
  '0px 5px 12px rgba(0, 0, 0, 0.24)',
  '0px 5px 14px rgba(0, 0, 0, 0.24)',
  '0px 5px 15px rgba(0, 0, 0, 0.24)',
  '0px 6px 15px rgba(0, 0, 0, 0.24)',
  '0px 7px 15px rgba(0, 0, 0, 0.24)',
  '0px 8px 15px rgba(0, 0, 0, 0.24)',
  '0px 9px 15px rgba(0, 0, 0, 0.24)',
  '0px 10px 15px rgba(0, 0, 0, 0.24)',
  '0px 12px 22px -8px rgba(0, 0, 0, 0.24)',
  '0px 13px 22px -8px rgba(0, 0, 0, 0.24)',
  '0px 14px 24px -8px rgba(0, 0, 0, 0.24)',
  '0px 20px 25px rgba(0, 0, 0, 0.24)',
  '0px 25px 50px rgba(0, 0, 0, 0.24)',
  '0px 25px 50px rgba(0, 0, 0, 0.24)',
  '0px 25px 50px rgba(0, 0, 0, 0.24)',
  '0px 25px 50px rgba(0, 0, 0, 0.24)'
];

const strongShadows = [
  'none',
  '0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)',
  '0px 1px 2px rgba(100, 116, 139, 0.12)',
  '0px 1px 4px rgba(100, 116, 139, 0.12)',
  '0px 1px 5px rgba(100, 116, 139, 0.12)',
  '0px 1px 6px rgba(100, 116, 139, 0.12)',
  '0px 2px 6px rgba(100, 116, 139, 0.12)',
  '0px 3px 6px rgba(100, 116, 139, 0.12)',
  '0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)',
  '0px 5px 12px rgba(100, 116, 139, 0.12)',
  '0px 5px 14px rgba(100, 116, 139, 0.12)',
  '0px 5px 15px rgba(100, 116, 139, 0.12)',
  '0px 6px 15px rgba(100, 116, 139, 0.12)',
  '0px 7px 15px rgba(100, 116, 139, 0.12)',
  '0px 8px 15px rgba(100, 116, 139, 0.12)',
  '0px 9px 15px rgba(100, 116, 139, 0.12)',
  '0px 10px 15px rgba(100, 116, 139, 0.12)',
  '0px 12px 22px -8px rgba(100, 116, 139, 0.25)',
  '0px 13px 22px -8px rgba(100, 116, 139, 0.25)',
  '0px 14px 24px -8px rgba(100, 116, 139, 0.25)',
  '0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)',
  '0px 25px 50px rgba(100, 116, 139, 0.25)',
  '0px 25px 50px rgba(100, 116, 139, 0.25)',
  '0px 25px 50px rgba(100, 116, 139, 0.25)',
  '0px 25px 50px rgba(100, 116, 139, 0.25)'
];

const baseRadius = 12;

const themeOptions = [
  {
    mode: LIGHT_THEME,
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            borderRadius: baseRadius
          }
        }
      },
      MuiButtonBase: {
        styleOverrides: {
          root: {
            borderRadius: baseRadius
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: baseRadius
          }
        }
      },
      MuiSkeleton: {
        styleOverrides: {
          rectangular: {
            borderRadius: baseRadius
          }
        }
      }
    },
    palette: {
      mode: LIGHT_THEME,
      action: {
        activatedOpacity: 0.12,
        active: '#6B7280',
        disabled: 'rgba(55, 65, 81, 0.26)',
        disabledBackground: 'rgba(55, 65, 81, 0.12)',
        disabledOpacity: 0.38,
        focus: 'rgba(55, 65, 81, 0.12)',
        focusOpacity: 0.12,
        hover: 'rgba(55, 65, 81, 0.04)',
        hoverOpacity: 0.04,
        selected: 'rgba(55, 65, 81, 0.08)',
        selectedOpacity: 0.08
      },
      primary: {
        dark: '#3832A0',
        light: '#828DF8',
        main: '#5048E5'
      },
      secondary: {
        dark: '#0B815A',
        light: '#3FC79A',
        main: '#10B981'
      },
      background: {
        default: '#F9FAFC',
        paper: '#FFFFFF'
      },
      divider: '#E6E8F0',
      error: {
        dark: '#922E2E',
        light: '#DA6868',
        main: '#D14343'
      },
      infos: {
        dark: '#0B79D0',
        light: '#64B6F7',
        main: '#2196F3'
      },
      warning: {
        dark: '#B27B16',
        light: '#FFBF4C',
        main: '#FFB020'
      },
      success: {
        dark: '#0E8074',
        light: '#43C6B7',
        main: '#14B8A6'
      },
      grey: {
        50: '#fafafa',
        100: '#f5f5f5',
        200: '#eeeeee',
        300: '#e0e0e0',
        400: '#bdbdbd',
        500: '#9e9e9e',
        600: '#757575',
        700: '#616161',
        800: '#424242',
        900: '#212121',
        A100: '#f5f5f5',
        A200: '#eeeeee',
        A400: '#bdbdbd',
        A700: '#616161'
      },
      shape: { borderRadius: 8 },
      text: {
        primary: '#121828',
        secondary: '#65748B'
      }
    },
    typography,
    shadows: softShadows
  },
  {
    mode: DARK_THEME,
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            borderRadius: baseRadius
          }
        }
      },
      MuiButtonBase: {
        styleOverrides: {
          root: {
            borderRadius: baseRadius
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: baseRadius
          }
        }
      },
      MuiSkeleton: {
        styleOverrides: {
          rectangular: {
            borderRadius: baseRadius
          }
        }
      }
    },
    palette: {
      mode: DARK_THEME,
      action: {
        activatedOpacity: 0.12,
        active: '#9CA3AF',
        disabled: 'rgba(255, 255, 255, 0.26)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        disabledOpacity: 0.38,
        focus: 'rgba(0, 0, 0, 0.12)',
        focusOpacity: 0.12,
        hover: 'rgba(255, 255, 255, 0.04)',
        hoverOpacity: 0.04,
        selected: 'rgba(255, 255, 255, 0.08)',
        selectedOpacity: 0.08
      },
      primary: {
        main: '#7582EB',
        light: '#909BEF',
        dark: '#515BA4'
      },
      secondary: {
        dark: '#0B815A',
        light: '#3FC79A',
        main: '#10B981'
      },
      background: {
        default: '#1d1f33',
        paper: '#272740'
        // default: '#0B0F19',
        // paper: '#111827'
      },
      divider: '#2D3748',
      error: {
        dark: '#922E2E',
        light: '#DA6868',
        main: '#D14343'
      },
      grey: {
        50: '#fafafa',
        100: '#f5f5f5',
        200: '#eeeeee',
        300: '#e0e0e0',
        400: '#bdbdbd',
        500: '#9e9e9e',
        600: '#757575',
        700: '#616161',
        800: '#424242',
        900: '#212121',
        A100: '#f5f5f5',
        A200: '#eeeeee',
        A400: '#bdbdbd',
        A700: '#616161'
      },
      infos: {
        dark: '#0B79D0',
        light: '#64B6F7',
        main: '#2196F3'
      },
      success: {
        dark: '#0E8074',
        light: '#43C6B7',
        main: '#14B8A6'
      },
      warning: {
        dark: '#B27B16',
        light: '#FFBF4C',
        main: '#FFB020'
      },
      shape: { borderRadius: 8 },
      text: {
        primary: '#fff',
        secondary: '#fff'
      }
    },
    typography,
    shadows: strongShadows
  }
];

const defaultConfig = {
  theme: LIGHT_THEME
};

const createMuiTheme = (config: any = defaultConfig) => {
  const options = themeOptions.find((option) => option.mode === config.theme);

  return createTheme({ ...options, ...config });
};

export default createMuiTheme;
