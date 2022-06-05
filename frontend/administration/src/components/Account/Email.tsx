/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';

// Hooks
import { useTranslation } from 'react-i18next';

// UI
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Fade,
  Grid,
  IconButton,
  Modal,
  Paper,
  Stack,
  SvgIcon,
  TextField,
  Typography
} from '@mui/material';

// Forms
import { Formik } from 'formik';
import * as Yup from 'yup';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { changeEmail, fetchProfileInfos } from 'src/redux/actions';

// Others
import { useSnackbar } from 'notistack';
import VerifyEmailForm from './VerifyForm';
import { Close } from '@mui/icons-material';

interface Props {
  email: string;
  confirmed: boolean;
}

const EmailForm = ({ email = '', confirmed }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const formRef = useRef<any>(null);

  const loading = useSelector<any, any>((state) => state.Auth.loading);
  const updateSuccess = useSelector<any, any>(
    (state) => state.Auth.updateEmailSuccess
  );
  const verifySuccess = useSelector<any, any>(
    (state) => state.Auth.confirmEmailSuccess
  );

  // States
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const success = updateSuccess?.getContentIfNotHandled();
    if (success) {
      enqueueSnackbar(t('CHANGES_SAVED_MESSAGE'), {
        variant: 'success'
      });
      dispatch(fetchProfileInfos());
      formRef.current.resetForm({
        email: formRef.current?.values?.new_email,
        new_email: ''
      });
    }
  }, [updateSuccess]);

  useEffect(() => {
    const success = verifySuccess?.getContentIfNotHandled();
    if (success) {
      enqueueSnackbar(t('CHANGES_SAVED_MESSAGE'), {
        variant: 'success'
      });
      dispatch(fetchProfileInfos());
      setModalOpen(false);
    }
  }, [verifySuccess]);

  return (
    <>
      {confirmed ? (
        <Alert severity="success" sx={{ mb: 3 }}>
          {t('ACCOUNT_VERIFIED_INFOS')}
        </Alert>
      ) : (
        <>
          <Alert
            severity="error"
            sx={{ mb: 3 }}
            action={
              <>
                <Button
                  size="small"
                  color="inherit"
                  disabled={loading}
                  onClick={() => {
                    dispatch(changeEmail(email));
                  }}
                >
                  {t('SEND')}
                </Button>
                <Button
                  size="small"
                  color="inherit"
                  disabled={loading}
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  {t('VERIFY')}
                </Button>
              </>
            }
          >
            {t('VERIFY_ACCOUNT_WARNING')}
          </Alert>
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            closeAfterTransition
          >
            <Fade in={modalOpen}>
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Container maxWidth="sm">
                  <Card>
                    <CardHeader
                      title={t('VERIFY_EMAIL_TITLE')}
                      titleTypographyProps={{ variant: 'h4' }}
                      sx={{ textAlign: 'center' }}
                      action={
                        <IconButton onClick={() => setModalOpen(false)}>
                          <SvgIcon>
                            <Close />
                          </SvgIcon>
                        </IconButton>
                      }
                    />
                    <CardContent>
                      <Stack spacing={3} textAlign="center">
                        <Typography>{t('ENTER_CODE_MESSAGE')}</Typography>
                        <VerifyEmailForm />
                      </Stack>
                    </CardContent>
                  </Card>
                </Container>
              </Box>
            </Fade>
          </Modal>
        </>
      )}
      <Paper sx={{ px: 4, py: 3 }}>
        <Formik
          innerRef={formRef}
          initialValues={{ email: email, new_email: '' }}
          validationSchema={Yup.object().shape({
            new_email: Yup.string().required().email(),
            email: Yup.string().email()
          })}
          onSubmit={(values, { setSubmitting }) => {
            try {
              dispatch(changeEmail(values.new_email));
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
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={t('CURRENT_EMAIL')}
                    placeholder={t('CURRENT_EMAIL')}
                    value={values.email}
                    name="email"
                    inputProps={{ readOnly: true }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label={t('NEW_EMAIL')}
                    placeholder={t('NEW_EMAIL')}
                    value={values.new_email}
                    name="new_email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.new_email && errors.new_email)}
                    helperText={touched.new_email && errors.new_email}
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
    </>
  );
};

export default EmailForm;
