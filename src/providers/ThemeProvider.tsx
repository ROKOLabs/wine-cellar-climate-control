import { createTheme, MantineProvider } from '@mantine/core';
import { ReactNode } from 'react';

const theme = createTheme({
  cursorType: 'pointer',
});

export const ThemeProvider = (props: { children: ReactNode }) => (
  <MantineProvider
    defaultColorScheme='dark'
    theme={theme}
  >
    {props.children}
  </MantineProvider>
);
