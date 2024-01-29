import '@mantine/core/styles.css';
import { ThemeProvider } from 'providers/ThemeProvider';
import { Router } from 'router/Router';

const App = () => (
  <ThemeProvider>
    <Router />
  </ThemeProvider>
);

export default App;
