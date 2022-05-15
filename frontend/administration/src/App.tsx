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
import { ThemeProvider } from '@mui/material/styles';
import createTheme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';

// Components
import FallbackScreen from './components/FallbackScreen';
import { useCookies } from 'react-cookie';
import { SnackbarProvider } from 'notistack';

function App() {
  const [cookies] = useCookies(['theme']);
  const theme = createTheme({ theme: cookies.theme });

  switch (i18next.language) {
    case LANGUAGES.ARABIC:
      moment.locale('ar');
      setLocale({ ...ar_errors });
      break;
    default:
      moment.locale('en');
      setLocale({ ...en_errors });
  }

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
