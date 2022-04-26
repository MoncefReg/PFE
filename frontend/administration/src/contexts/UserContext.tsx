import { createContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import { User } from 'src/models';

interface Context {
  setUser: (data: User | null) => void;
  user?: User | null;
}

const initValue: Context = {
  setUser: () => {}
};

export const UserContext = createContext(initValue);

const UserProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>();
  const [, setCookies] = useCookies(['user']);

  const updateUser = (user: User | null) => {
    setUser(user);
    setCookies('user', user);
  };
  return (
    <UserContext.Provider value={{ user, setUser: updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
