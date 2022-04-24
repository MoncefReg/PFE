// Routing
import { Suspense } from 'react';
import Router from './components/Router';
import { BrowserRouter } from 'react-router-dom';

// Localization
import './i18n/config';

// Theme
import { ThemeProvider } from '@mui/material/styles';
import createTheme from './theme';

// Components
import FallbackScreen from './components/FallbackScreen';

import { CookiesProvider } from 'react-cookie';

function App() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CookiesProvider>
        <Suspense fallback={<FallbackScreen />}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </Suspense>
      </CookiesProvider>
    </ThemeProvider>
  );
}

export default App;
