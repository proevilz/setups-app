import { useState, createContext, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

interface AuthContext {
  user: {} | null;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  isAuthed: boolean;
  signInModalOpen: boolean;
  setSignInModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  signUpModalOpen: boolean;
  setSignUpModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface IUser {
  id: number;
  email: string;
  password: string;
  username: string;
  updatedAt: Date;
  createdAt: Date;
}
interface IToken {
  exp: number;
  iat: number;
  user: IUser;
}
export const AuthContext = createContext<AuthContext>({} as AuthContext);

export const AuthState: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [isAuthed, setIsAuthed] = useState(!!user);
  const signOut = () => {
    setToken(null);
    setUser(null);
  };
  // const isAuthed = !!user;
  useEffect(() => {
    if (token && token.length > 0) {
      const decoded: IToken = jwt_decode(token);
      setUser(decoded.user);
    }
  }, [token]);
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        setToken,
        isAuthed,
        signInModalOpen,
        setSignInModalOpen,
        signUpModalOpen,
        setSignUpModalOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
