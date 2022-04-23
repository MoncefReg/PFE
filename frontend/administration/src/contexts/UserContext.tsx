import { createContext, useState } from 'react';
import { User } from 'src/models';

interface Context {
  setUser?: (data: User) => void;
  user?: User;
}

const initValue: Context = {};

export const UserContext = createContext(initValue);

const UserContextProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | undefined>();

  const updateUser = (user: User) => {
    setUser({ ...user });
  };
  return (
    <UserContext.Provider value={{ user, setUser: updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
