import '@mantine/core/styles.css';
import AppLayout from 'components/AppLayout';
import { AuthProvider } from 'features/auth/AuthProvider';
import { Router } from 'router/Router';
import { StoreProvider } from 'store/StoreProvider';
import { ThemeProvider } from 'theme/ThemeProvider';

const App = () => (
  <StoreProvider>
    <AuthProvider>
      <ThemeProvider>
        <AppLayout>
          <Router />
        </AppLayout>
      </ThemeProvider>
    </AuthProvider>
  </StoreProvider>
);

export default App;
