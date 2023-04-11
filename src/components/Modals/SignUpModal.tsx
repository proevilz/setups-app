import {
  Modal,
  Group,
  Button,
  TextInput,
  PasswordInput,
  Box,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAt, IconLock, IconMailBolt } from '@tabler/icons-react';
import { useContext, useState } from 'react';
import { useMutation } from 'react-query';
import { AuthContext } from '../../Context';
import { signUpUser } from '../../Queries';
import { signUpValidators } from './validators';

const SignUpModal = () => {
  const { signUpModalOpen, setSignUpModalOpen, setSignInModalOpen, setToken } =
    useContext(AuthContext);

  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: signUpValidators,
  });
  const handleErrors = (error: any) => {
    const errorTypes = ['USER_EXISTS/USERNAME', 'USER_EXISTS/EMAIL'];
    if (errorTypes.includes(error.type)) {
      const field = error.type.split('/')[1].toLowerCase();
      form.setFieldError(field, error.message);
      return;
    }
    setError('Something went wrong, try again later.');
  };

  const mutation = useMutation({
    mutationFn: signUpUser,
    onError: handleErrors,
    onSuccess: data => setToken(data.token),
  });

  return (
    <Modal
      opened={signUpModalOpen}
      onClose={() => {
        setSignUpModalOpen(false);
        setError(null);
        form.reset();
      }}
      title="Sign up"
      size="lg"
    >
      <form
        onSubmit={form.onSubmit(({ email, username, password }) => {
          setError(null);
          mutation.mutate({ email, username, password });
        })}
      >
        <Box mb="20px">
          <TextInput
            icon={<IconAt size="0.8rem" />}
            mb="md"
            withAsterisk
            label="Username"
            placeholder="Rubberduck"
            {...form.getInputProps('username')}
          />
          <TextInput
            icon={<IconMailBolt size="0.8rem" />}
            mb="md"
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps('email')}
          />

          <PasswordInput
            icon={<IconLock size="0.8rem" />}
            mb="md"
            withAsterisk
            label="Password"
            placeholder="****************"
            {...form.getInputProps('password')}
          />
          <PasswordInput
            icon={<IconLock size="0.8rem" />}
            mb="md"
            withAsterisk
            label="Confirm password"
            placeholder="****************"
            {...form.getInputProps('confirmPassword')}
          />
          <Group position="right" mt="xl">
            <Button
              variant="subtle"
              fw="normal"
              onClick={() => {
                setSignInModalOpen(true);
                setSignUpModalOpen(false);
                setError(null);
                form.reset();
              }}
            >
              Already have an account?
            </Button>
            <Button
              type="submit"
              variant="gradient"
              loading={mutation.isLoading}
            >
              Sign up
            </Button>
          </Group>
          {error && <Text color="red">{error}</Text>}
        </Box>
      </form>
    </Modal>
  );
};

export default SignUpModal;
