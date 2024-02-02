import '@mantine/core/styles.css';
import { AuthProvider } from 'features/auth/AuthProvider';
import { SidebarProvider } from 'features/layout/SidebarContext';
import { Router } from 'router/Router';
import { StoreProvider } from 'store/StoreProvider';
import { ThemeProvider } from 'theme/ThemeProvider';

const App = () => (
  <StoreProvider>
    <AuthProvider>
      <SidebarProvider>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </SidebarProvider>
    </AuthProvider>
  </StoreProvider>
);

export default App;
