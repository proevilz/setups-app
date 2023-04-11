import {
  Menu,
  Box,
  rem,
  UnstyledButton,
  Group,
  Avatar,
  useMantineTheme,
  Text,
} from '@mantine/core';
import {
  IconUser,
  IconMessageCircle,
  IconHelp,
  IconLogout,
} from '@tabler/icons-react';

const UserMenu = () => {
  const theme = useMantineTheme();
  return (
    <Menu shadow="md" width={200} position="top">
      <Menu.Target>
        <Box
          sx={{
            paddingTop: theme.spacing.sm,
            borderTop: `${rem(1)} solid ${
              theme.colorScheme === 'dark'
                ? theme.colors.dark[4]
                : theme.colors.gray[2]
            }`,
          }}
        >
          <UnstyledButton
            sx={{
              display: 'block',
              width: '100%',
              padding: theme.spacing.xs,
              borderRadius: theme.radius.sm,
              color:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[0]
                  : theme.black,

              '&:hover': {
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
              },
            }}
          >
            <Group>
              <Avatar
                src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                radius="xl"
              />
              <Box sx={{ flex: 1 }}>
                <Text size="sm" weight={500}>
                  ProEvilz
                </Text>
                <Text color="dimmed" size="xs">
                  proevilz@outlook.com
                </Text>
              </Box>

              {'>'}
            </Group>
          </UnstyledButton>
        </Box>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item icon={<IconUser size={14} />}>Profile</Menu.Item>
        <Menu.Item icon={<IconMessageCircle size={14} />}>Messages</Menu.Item>
        <Menu.Item icon={<IconHelp size={14} />}>Support</Menu.Item>

        <Menu.Divider />

        <Menu.Item icon={<IconLogout size={14} />}>Sign out</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserMenu;
