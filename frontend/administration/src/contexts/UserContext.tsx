import { createContext, useState } from 'react';
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

  const updateUser = (user: User | null) => {
    setUser(user ?? null);
  };
  return (
    <UserContext.Provider value={{ user, setUser: updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
