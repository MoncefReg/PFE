import { useNavigate } from 'react-router';
import useAuth from 'src/hooks/useAuth';
import { UNAUTH_REDIRECT_DEFAULT } from 'src/constants';

interface Props {
  children: JSX.Element;
  fallback?: string;
}

const AuthGuard = ({ children, fallback = UNAUTH_REDIRECT_DEFAULT }: Props) => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  return isAuth ? <>{children}</> : navigate(fallback);
};

export default AuthGuard;
