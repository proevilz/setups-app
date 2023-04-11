import {
  Modal,
  Group,
  Button,
  TextInput,
  PasswordInput,
  Box,
  Text,
  Anchor,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useContext, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { AuthContext } from '../../Context';
import { signInUser } from '../../Queries';
import { signInValidators } from './validators';

const SignInModal = () => {
  const { signInModalOpen, setSignInModalOpen, setSignUpModalOpen, setToken } =
    useContext(AuthContext);

  const [error, setError] = useState<{ type: string; message: string } | null>(
    null
  );
  const form = useForm({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: signInValidators,
  });

  useEffect(() => {
    setError(null);
  }, [form.values]);
  const handleError = (error: any) => {
    if (error.type === 'INVALID_CREDENTIALS') {
      form.setFieldError('email', ' ');
      form.setFieldError('password', ' ');
      setError(error);
      return;
    }
    if (error.type === 'ACCOUNT_NOT_EXISTS') {
      form.setFieldError(
        'email',
        `We couldn't find an account with this email`
      );
      return;
    }
    setError({
      type: 'UNKNOWN',
      message: 'Something went wrong, try again later.',
    });
  };

  const mutation = useMutation({
    mutationFn: signInUser,
    onError: handleError,
    onSuccess: data => setToken(data.token),
  });

  return (
    <Modal
      opened={signInModalOpen}
      onClose={() => {
        setSignInModalOpen(false);
        setError(null);
        form.reset();
      }}
      title="Sign in"
      size="lg"
    >
      <form
        onSubmit={form.onSubmit(({ email, password }) =>
          mutation.mutate({ email, password })
        )}
      >
        <Box mb="20px" pos="relative">
          <TextInput
            mb="md"
            withAsterisk
            label="Email"
            required
            error
            placeholder="your@email.com"
            {...form.getInputProps('email')}
          />

          <PasswordInput
            mb="md"
            withAsterisk
            label="Password"
            required
            error
            placeholder="****************"
            {...form.getInputProps('password')}
          />
          {error && <Text color="red">{error.message}</Text>}
          <Group position="apart" mt="xl">
            <Button
              variant="subtle"
              fw="normal"
              onClick={() => {
                setSignInModalOpen(false);
                setSignUpModalOpen(true);
                setError(null);
                form.reset();
              }}
            >
              Need an account?
            </Button>
            <div>
              <Anchor href="#" target="_blank" mr="sm">
                Reset password
              </Anchor>

              <Button
                type="submit"
                variant="gradient"
                loading={mutation.isLoading}
              >
                Sign in
              </Button>
            </div>
          </Group>
        </Box>
      </form>
    </Modal>
  );
};

export default SignInModal;
