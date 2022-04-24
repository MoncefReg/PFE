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
import { useCookies } from 'react-cookie';

function App() {
  const [cookies] = useCookies(['theme']);
  const theme = createTheme({ theme: cookies.theme });

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<FallbackScreen />}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
