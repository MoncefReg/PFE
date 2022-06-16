// Routing
import { Suspense } from 'react';
import Router from './components/Router';
import { BrowserRouter } from 'react-router-dom';

// Localization
import i18next from 'i18next';
import { setLocale } from 'yup';
import moment from 'moment';
import { LANGUAGES } from './constants';
import ar_errors from './i18n/ar/yup_errors';
import en_errors from './i18n/en/yup_errors';
import './i18n/config';

// Theme
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import createTheme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';

// Components
import FallbackScreen from './components/FallbackScreen';
import { SnackbarProvider } from 'notistack';
import useSettings from './hooks/useSettings';

// RTL
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

function App() {
  const { theme: themeSettings, language } = useSettings();
  const theme = createTheme({
    theme: themeSettings,
    direction: language === LANGUAGES.ARABIC ? 'RTL' : 'LTR'
  });

  switch (i18next.language) {
    case LANGUAGES.ARABIC:
      moment.locale('ar');
      setLocale({ ...ar_errors });
      break;
    default:
      moment.locale('en');
      setLocale({ ...en_errors });
  }

  // Create rtl cache
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: language === LANGUAGES.ARABIC ? [rtlPlugin] : []
  });

  return (
    <div dir={language === LANGUAGES.ARABIC ? 'rtl' : 'ltr'}>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <CacheProvider value={cacheRtl}>
            <Suspense fallback={<FallbackScreen />}>
              <SnackbarProvider
                dense
                preventDuplicate
                maxSnack={3}
                autoHideDuration={4000}
                style={{ marginBottom: 10 }}
              >
                <BrowserRouter>
                  <Router />
                </BrowserRouter>
              </SnackbarProvider>
            </Suspense>
          </CacheProvider>
        </StyledEngineProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
