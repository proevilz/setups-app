export const signInUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response: Response = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/signin`,
    {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw data;
  }
  return data;
};

export const signUpUser = async ({
  email,
  username,
  password,
}: {
  email: string;
  username: string;
  password: string;
}) => {
  const response: Response = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/signup`,
    {
      method: 'POST',
      body: JSON.stringify({ email, username, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw data;
  }

  return data;
};
