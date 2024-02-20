import 'theme/styles.css';
import { DevTools } from 'components/DevTools';
import { DevToolsProvider } from 'components/DevTools/components/provider/DevToolsContext';
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
          <DevToolsProvider>
            <Router />
            <DevTools />
          </DevToolsProvider>
        </ThemeProvider>
      </AuthProvider>
    </DbProvider>
  </StoreProvider>
);

// eslint-disable-next-line import/no-default-export
export default App;
