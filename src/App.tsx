import '@mantine/core/styles.css';
import { AuthProvider } from 'features/auth/AuthProvider';
import { Router } from 'router/Router';
import { StoreProvider } from 'store/StoreProvider';
import { ThemeProvider } from 'theme/ThemeProvider';

const App = () => (
  <StoreProvider>
    <AuthProvider>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </AuthProvider>
  </StoreProvider>
);

// eslint-disable-next-line import/no-default-export
export default App;
