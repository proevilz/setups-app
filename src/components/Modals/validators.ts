import { matchesField } from '@mantine/form';

export const signUpValidators = {
  username: (value: string) =>
    /^[a-zA-Z0-9]+$/.test(value)
      ? null
      : 'Username should only contain letters, numbers, hyphens',
  email: (value: string) => {
    console.log('valid: ', /^\S+@\S+$/.test(value));
    if (/^\S+@\S+$/.test(value) === false) {
      return 'This is not a valid email address';
    }
    if (value.length === 0) {
      return 'You must specify an email address';
    }
    return null;
  },
  password: (value: string) => {
    if (value.length < 8) {
      return 'Password must be at least 8 characters';
    }
    if (value.length > 30) {
      return 'Password must be a maximum of 30 characters';
    }
    return null;
  },
  confirmPassword: matchesField('password', 'Passwords are not the same'),
};

export const signInValidators = {
  email: (value: string) => {
    console.log('valid: ', /^\S+@\S+$/.test(value));
    if (/^\S+@\S+$/.test(value) === false) {
      return 'This is not a valid email address';
    }
    if (value.length === 0) {
      return 'You must specify an email address';
    }
    return null;
  },
  password: (value: string) =>
    value.length === 0 ? 'You must specify a password' : null,
};
