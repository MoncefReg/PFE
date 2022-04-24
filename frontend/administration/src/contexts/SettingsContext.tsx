import { createContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import { THEME_OPTIONS } from 'src/constants';
import { LanguageOptions, ThemeOptions } from 'src/models';

interface SettingsProps {
  language?: LanguageOptions;
  theme?: ThemeOptions;
  saveTheme?: any;
  saveLanguage?: any;
}

const initValue: SettingsProps = {};

export const SettingsContext = createContext(initValue);

const SettingsProvider = ({ children }: { children: JSX.Element }) => {
  const [cookies, setCookies] = useCookies(['theme']);
  const [theme, setTheme] = useState<ThemeOptions>(
    cookies.theme || THEME_OPTIONS.LIGHT
  );

  const saveTheme = (theme: ThemeOptions) => {
    setTheme(theme);
    setCookies('theme', theme);
  };

  return (
    <SettingsContext.Provider value={{ theme, saveTheme }}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
