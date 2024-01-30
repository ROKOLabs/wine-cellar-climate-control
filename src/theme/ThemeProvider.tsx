import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  cursorType: 'pointer',
});

export const ThemeProvider = (props: { children: React.ReactNode }) => (
  <MantineProvider defaultColorScheme="dark" theme={theme}>
    {props.children}
  </MantineProvider>
);
