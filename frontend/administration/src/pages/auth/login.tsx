/* eslint-disable react-hooks/exhaustive-deps */
import { useTranslation } from 'react-i18next';
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  styled,
  TextField,
  Typography
} from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import ApiEvent from 'src/utils/ApiEvent';
import { login } from 'src/redux/auth/actions';
import { useNavigate } from 'react-router';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Root = styled('div')(({ theme }) => ({
  background: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100%',
  textAlign: 'center'
}));

type eventType = { type: string; msgs: string[] };

const Login = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector<any, ApiEvent<eventType>>(
    (state: any) => state.Auth.error
  );
  const loginSuccess = useSelector<any, ApiEvent>(
    (state) => state.Auth.loginSuccess
  );

  const [showPass, setShowPass] = useState(false);

  const handleShowPass = () => {
    setShowPass((prevState) => !prevState);
  };

  useEffect(() => {
    const success = loginSuccess?.getContentIfNotHandled();
    if (success) {
      navigate('/dashboard');
    }
  }, [loginSuccess]);

  useEffect(() => {
    const errors = error?.getContentIfNotHandled();
    if (errors)
      errors.msgs.forEach((err) => enqueueSnackbar(err, { variant: 'error' }));
  }, [error]);

  return (
    <Root>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().required(),
          password: Yup.string().required()
        })}
        onSubmit={(values) => {
          dispatch(login(values));
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit
        }) => (
          <form noValidate>
            <Stack width={400} spacing={3}>
              <Typography variant="h4" color="text.primary">
                {t('LOGIN.TITLE')}
              </Typography>
              <Typography variant="h6" color="text.primary">
                {t('LOGIN.MESSAGE')}
              </Typography>
              <TextField
                name="email"
                fullWidth
                value={values.email}
                label={t('EMAIL')}
                placeholder={t('EMAIL')}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                name="password"
                fullWidth
                value={values.password}
                label={t('PASSWORD')}
                placeholder={t('PASSWORD')}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
                type={showPass ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      aria-label="change-pass-visibilty"
                    >
                      <IconButton onClick={handleShowPass} edge="end">
                        {showPass ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Button
                variant="contained"
                onClick={handleSubmit as any}
                color="primary"
              >
                {t('LOGIN.ACTION')}
              </Button>
            </Stack>
          </form>
        )}
      </Formik>
    </Root>
  );
};

export default Login;
