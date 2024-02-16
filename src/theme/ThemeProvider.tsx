import '@mantine/notifications/styles.css';
import {
  createTheme,
  MantineProvider,
  ActionIcon,
  Button,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';

const theme = createTheme({
  cursorType: 'pointer',
  components: {
    Button: Button.extend({
      styles: {
        root: {
          transition: 'background-color 300ms ease-out, color 300ms ease-out',
        },
      },
    }),
    ActionIcon: ActionIcon.extend({
      styles: {
        root: {
          transition: 'background-color 300ms ease-out, color 300ms ease-out',
        },
      },
    }),
  },
});

export const ThemeProvider = (props: { children: React.ReactNode }) => (
  <MantineProvider defaultColorScheme="dark" theme={theme}>
    {props.children}
    <Notifications />
  </MantineProvider>
);
