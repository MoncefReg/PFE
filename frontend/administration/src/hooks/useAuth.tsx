const useAuth = () => {
  const isAuth = Boolean(localStorage.getItem('token'));
  return { isAuth };
};

export default useAuth;
