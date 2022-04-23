import { useContext } from 'react';
import { UserContext } from 'src/contexts/UserContext';

export default function useUser() {
  return useContext(UserContext);
}
