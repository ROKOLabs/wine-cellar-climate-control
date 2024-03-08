import 'theme/styles.css';
import { DevTools } from 'components/DevTools';
import { AuthProvider } from 'features/auth/AuthProvider';
import { DbProvider } from 'features/db/DbProvider';
import { Router } from 'router/Router';
import { StoreProvider } from 'store/StoreProvider';
import { ThemeProvider } from 'theme/ThemeProvider';

const App = () => (
  <StoreProvider>
    <DbProvider>
      <AuthProvider>
        <ThemeProvider>
          <Router />
          <DevTools />
        </ThemeProvider>
      </AuthProvider>
    </DbProvider>
  </StoreProvider>
);

// eslint-disable-next-line import/no-default-export
export default App;
