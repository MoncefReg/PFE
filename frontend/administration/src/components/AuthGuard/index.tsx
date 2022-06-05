import { useNavigate } from 'react-router';
import useAuth from 'src/hooks/useAuth';
import { UNAUTH_REDIRECT_DEFAULT } from 'src/constants';
import { useEffect } from 'react';

interface Props {
  children: JSX.Element;
  fallback?: string;
}

const AuthGuard = ({ children, fallback = UNAUTH_REDIRECT_DEFAULT }: Props) => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) navigate(fallback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return isAuth ? <>{children}</> : <></>;
};

export default AuthGuard;
