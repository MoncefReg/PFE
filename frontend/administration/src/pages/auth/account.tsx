/* eslint-disable react-hooks/exhaustive-deps */
import { styled } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import AccountForms from 'src/components/Account';
import { fetchProfileInfos } from 'src/redux/actions';
import ApiEvent from 'src/utils/ApiEvent';

const Root = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'column',
  padding: '0 30px',
  marginTop: 40
}));

const Account = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const error = useSelector<any, ApiEvent<{ msgs: string[] }>>(
    (state) => state.Auth.error
  );

  useEffect(() => {
    const errors = error?.getContentIfNotHandled();
    if (errors)
      errors.msgs.forEach((err) => enqueueSnackbar(err, { variant: 'error' }));
  }, [error]);

  useEffect(() => {
    dispatch(fetchProfileInfos());
  }, []);

  return (
    <Root>
      <AccountForms />
    </Root>
  );
};

export default Account;
