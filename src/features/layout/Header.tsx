import { ActionIcon, Burger, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch, IconUser } from '@tabler/icons-react';

export default function Header() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 16px',
        height: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        Wine Cellar Climate Control
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Tooltip label="Search">
          <ActionIcon variant="light">
            <IconSearch />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="Log in">
          <ActionIcon variant="light">
            <IconUser />
          </ActionIcon>
        </Tooltip>
      </div>
    </div>
  );
}
