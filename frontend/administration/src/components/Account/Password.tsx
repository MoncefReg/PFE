/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';

// Hooks
import { useTranslation } from 'react-i18next';

// UI
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  SvgIcon,
  TextField
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// Forms
import { Formik } from 'formik';
import * as Yup from 'yup';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from 'src/redux/actions';

// Others
import { useSnackbar } from 'notistack';

const PasswordForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const formikRef = useRef<any>(null);

  const loading = useSelector<any, any>((state) => state.Auth.loading);
  const updateSuccess = useSelector<any, any>(
    (state) => state.Auth.updatePassSuccess
  );

  // States
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConf, setShowPasswordConf] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleShowPasswordConf = () => {
    setShowPasswordConf((prevState) => !prevState);
  };

  useEffect(() => {
    const success = updateSuccess?.getContentIfNotHandled();
    if (success) {
      enqueueSnackbar(t('PASS_CHANGED_SUCCESSFULLY'), {
        variant: 'success'
      });
      formikRef.current.handleReset();
      setShowPassword(false);
      setShowPasswordConf(false);
    }
  }, [updateSuccess]);

  return (
    <Paper sx={{ px: 4, py: 3 }}>
      <Formik
        innerRef={formikRef}
        initialValues={{
          old_password: '',
          new_password: ''
        }}
        validationSchema={Yup.object().shape({
          old_password: Yup.string().required(),
          new_password: Yup.string().required().min(8, t('WEAK_PASSWORD'))
        })}
        onSubmit={(values, { setSubmitting }) => {
          try {
            dispatch(
              changePassword({
                old_password: values.old_password,
                new_password1: values.new_password,
                new_password2: values.new_password
              })
            );
            setSubmitting(false);
          } catch (error) {
            setSubmitting(false);
          }
        }}
      >
        {({
          values,
          handleChange,
          handleBlur,
          errors,
          touched,
          handleSubmit,
          isSubmitting
        }) => (
          <form>
            <Grid container rowSpacing={3} columnSpacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="old_password"
                  value={values.old_password}
                  placeholder={t('CURRENT_PASSWORD')}
                  type={showPassword ? 'text' : 'password'}
                  label={t('CURRENT_PASSWORD')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.old_password && errors.old_password)}
                  helperText={touched.old_password && errors.old_password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                          <SvgIcon>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </SvgIcon>
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="new_password"
                  value={values.new_password}
                  placeholder={t('NEW_PASSWORD')}
                  type={showPasswordConf ? 'text' : 'password'}
                  label={t('NEW_PASSWORD')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.new_password && errors.new_password)}
                  helperText={touched.new_password && errors.new_password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPasswordConf}>
                          <SvgIcon>
                            {showPasswordConf ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </SvgIcon>
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="flex-end"
                >
                  <Button
                    variant="contained"
                    onClick={handleSubmit as any}
                    disabled={isSubmitting || loading}
                  >
                    {t('SAVE')}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Paper>
  );
};

export default PasswordForm;
