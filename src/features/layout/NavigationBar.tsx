import {
  Stack,
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from '@mantine/core';
import {
  IconSun,
  IconMoon,
  IconSettings,
  IconHome2,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { useSidebar } from './hooks/useSidebar';

export default function NavigationBar() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('dark');
  const navigate = useNavigate();

  const { toggleSidebar } = useSidebar();

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
    toggleSidebar();
  };

  const navigateToSettings = () => {
    navigate('/settings');
    toggleSidebar();
  };

  const navigateToHome = () => {
    navigate('/');
    toggleSidebar();
  };

  return (
    <Stack gap="md" justify="center" style={{ height: '100%' }}>
      <Stack>
        <ActionIcon variant="light" onClick={navigateToHome}>
          <IconHome2 />
        </ActionIcon>
      </Stack>
      <Stack style={{ marginTop: 'auto' }}>
        <Stack gap="md" justify="center">
          <ActionIcon variant="light" onClick={navigateToSettings}>
            <IconSettings />
          </ActionIcon>
          <ActionIcon variant="light" onClick={toggleColorScheme}>
            {computedColorScheme === 'dark' ? <IconSun /> : <IconMoon />}
          </ActionIcon>
        </Stack>
      </Stack>
    </Stack>
  );
}
