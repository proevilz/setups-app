import {
  Navbar,
  Flex,
  Title,
  Button,
  Box,
  rem,
  UnstyledButton,
  Group,
  Avatar,
  Text,
  useMantineTheme,
  Menu,
  NavLink,
} from '@mantine/core';
import { useContext } from 'react';
import { AuthContext } from '../../Context';
import Logo from '../Logo';
import Navlinks from './Navlinks';
import UserMenu from './UserMenu';

const Navigation = () => {
  const theme = useMantineTheme();
  const { isAuthed, setSignInModalOpen } = useContext(AuthContext);
  return (
    <Navbar width={{ base: 300 }} height={'100vh'} p="xs">
      <Navbar.Section mt="xs">
        <Flex align="center" justify="center">
          <Logo />
          <Title ml="sm" mb="5px" order={1}>
            setups
          </Title>
        </Flex>
      </Navbar.Section>
      <Navbar.Section grow mt="md">
        <Navlinks />
      </Navbar.Section>
      <Navbar.Section>
        {isAuthed ? (
          <UserMenu />
        ) : (
          <Flex w="100%" align="center" justify="center" direction="column">
            <Button
              mt="12px"
              w="100%"
              variant={'gradient'}
              onClick={() => setSignInModalOpen(true)}
            >
              Sign in
            </Button>
          </Flex>
        )}
      </Navbar.Section>
    </Navbar>
  );
};

export default Navigation;
