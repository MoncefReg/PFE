/* eslint-disable import/named */
import {
  Theme as MUITheme,
  ThemeOptions as MUIThemeOptions
} from '@mui/material/styles';

declare module '@mui/material/styles' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Theme extends MUITheme {}
  // allow configuration using `createTheme`
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface ThemeOptions extends MUIThemeOptions {}
  export function createTheme(options?: ThemeOptions): Theme;
}

declare module '@mui/material/Typography' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface TypographyPropsVariantOverrides {}
}
