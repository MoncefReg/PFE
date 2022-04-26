import { useCookies } from 'react-cookie';

const useAuth = () => {
  const [cookies] = useCookies(['token']);
  const isAuth = Boolean(cookies['token']);
  return { isAuth };
};

export default useAuth;
