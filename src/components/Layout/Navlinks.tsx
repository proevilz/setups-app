import { Flex, Button } from '@mantine/core';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../Context';

const Navlinks = () => {
  const { isAuthed } = useContext(AuthContext);
  return (
    <Flex
      direction="column"
      align="flex-start"
      px="lg"
      sx={() => ({ fontSize: '30px' })}
    >
      <Button component={NavLink} to="/discover" variant={'subltle'}>
        Discover
      </Button>
      <Button component={NavLink} to="/search" variant={'subltle'}>
        Search
      </Button>
      <Button component={NavLink} to="/following" variant={'subltle'}>
        Following
      </Button>

      {isAuthed && (
        <Button component={NavLink} to="/create" mt="12px" variant={'outline'}>
          Create
        </Button>
      )}
    </Flex>
  );
};

export default Navlinks;
