import '@mantine/notifications/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

const theme = createTheme({
  cursorType: 'pointer',
  activeClassName: 'Button',
});

export const ThemeProvider = (props: { children: React.ReactNode }) => (
  <MantineProvider defaultColorScheme="dark" theme={theme}>
    {props.children}
    <Notifications />
  </MantineProvider>
);
