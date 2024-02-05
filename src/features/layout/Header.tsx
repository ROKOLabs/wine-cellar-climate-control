import { ActionIcon, Burger, Flex, Group, Title, Tooltip } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSearch, IconUser } from '@tabler/icons-react';

export default function Header() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <Flex justify="space-between" p={{ base: '3px', sm: 'md' }} h="100%">
      <Group w={{ base: '65%' }}>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Title order={4} w={{ base: '70%', sm: '100%' }}>
          Wine Cellar Climate Control
        </Title>
      </Group>
      <Group gap="xs" w={{ base: '70px' }}>
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
      </Group>
    </Flex>
  );
}
