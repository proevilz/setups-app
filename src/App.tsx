import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  Text,
} from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import Layout from './components/Layout/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { NavigationProgress } from '@mantine/nprogress';
export default function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'dark',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) => {
    return setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  };

  useHotkeys([['mod+J', () => toggleColorScheme()]]);
  const Create = () => <p>create page</p>;
  const Following = () => <p>Following page</p>;
  const Explore = () => <p>Explore</p>;

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <NavigationProgress />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/following" element={<Following />} />
              <Route path="/expore" element={<Create />} />
              <Route path="/create" element={<Create />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
