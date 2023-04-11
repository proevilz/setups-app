import { AppShell, MantineTheme } from '@mantine/core';

import { Outlet } from 'react-router-dom';
import SignInModal from '../Modals/SignInModal';
import SignUpModal from '../Modals/SignUpModal';

import Navigation from './Navigation';

export default function Layout() {
  const getStyles = (theme: MantineTheme) => {
    return {
      main: {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
      },
    };
  };

  return (
    <AppShell padding="md" navbar={<Navigation />} styles={getStyles}>
      <SignUpModal />
      <SignInModal />
      <Outlet />
    </AppShell>
  );
}
