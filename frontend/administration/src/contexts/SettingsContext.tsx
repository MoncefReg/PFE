import i18next from 'i18next';
import { createContext, useEffect, useState } from 'react';
import { LANGUAGES, THEME_OPTIONS } from 'src/constants';
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
  const [theme, setTheme] = useState<ThemeOptions>(
    (localStorage.getItem('theme') as any) || THEME_OPTIONS.LIGHT
  );
  const [language, setLanguage] = useState(
    (localStorage.getItem('language') as any) || LANGUAGES.ENGLISH
  );

  const saveTheme = (theme: ThemeOptions) => {
    setTheme(theme);
    localStorage.setItem('theme', theme);
  };

  const saveLanguage = (value: any) => {
    setLanguage(value);
    localStorage.setItem('language', value);
    if (value !== language) window.location.reload();
  };

  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);

  return (
    <SettingsContext.Provider
      value={{ theme, saveTheme, language, saveLanguage }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
