import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AUTH_REDIRECT_DEFAULT } from 'src/constants';
import useAuth from 'src/hooks/useAuth';

interface Props {
  children: JSX.Element;
  fallback?: string;
}

const GuestGuard = ({ children, fallback = AUTH_REDIRECT_DEFAULT }: Props) => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) navigate(fallback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  return !isAuth ? <>{children}</> : <></>;
};

export default GuestGuard;
