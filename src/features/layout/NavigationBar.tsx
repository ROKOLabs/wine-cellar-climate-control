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

export default function NavigationBar() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('dark');
  const navigate = useNavigate();

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  const navigateToSettings = () => {
    navigate('/settings');
  };

  const navigateToHome = () => {
    navigate('/');
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
