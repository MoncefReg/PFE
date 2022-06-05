/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef } from 'react';

// Hooks
import { useTranslation } from 'react-i18next';

// UI
import { Box, Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

// Formik
import { Formik } from 'formik';
import * as Yup from 'yup';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { confirmEmailChange } from 'src/redux/actions';

const PREFIX = 'confirm-email-change-form';

const classes = {
  form: `${PREFIX}-form`,
  inputGroup: `${PREFIX}-input-group`,
  pinInput: `${PREFIX}-pin-input`,
  submit: `${PREFIX}-submit`
};

const RootForm = styled('form')(({ theme }) => ({
  [`&.${classes.form}`]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  [`& .${classes.inputGroup}`]: {
    width: '100%',
    padding: '0px 10px 0px',
    maxWidth: 500,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    margin: 'auto'
  },
  [`& .${classes.pinInput}`]: {
    maxWidth: 40,
    textAlign: 'center',
    margin: '0 5px 0'
  },
  [`& .${classes.submit}`]: {
    marginTop: theme.spacing(3),
    maxWidth: 500,
    minWidth: 300,
    [theme.breakpoints.down('sm')]: {
      maxWidth: 300,
      minWidth: 200
    }
  }
}));

const PIN_PATTERN = '^[0-9]{0,1}$';

const VerifyEmailForm = () => {
  const refs: any[] = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  const dispatch = useDispatch();
  const loading = useSelector<any, any>((state) => state.Auth.loading);
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{ 0: '', 1: '', 2: '', 3: '', 4: '', 5: '' }}
      validationSchema={Yup.object().shape({
        0: Yup.string().required(),
        1: Yup.string().required(),
        2: Yup.string().required(),
        3: Yup.string().required(),
        4: Yup.string().required(),
        5: Yup.string().required()
      })}
      onSubmit={(values, { setSubmitting }) => {
        try {
          const code = `${values[0]}${values[1]}${values[2]}${values[3]}${values[4]}${values[5]}`;
          dispatch(confirmEmailChange(code));
          setSubmitting(false);
        } catch (error) {
          setSubmitting(false);
        }
      }}
    >
      {({
        setFieldValue,
        setFieldError,
        setFieldTouched,
        values,
        errors,
        touched,
        handleSubmit,
        isSubmitting
      }) => (
        <RootForm noValidate className={classes.form}>
          <Box className={classes.inputGroup}>
            {Array(6)
              .fill(0)
              .map((item, index: any) => (
                <TextField
                  key={index}
                  className={classes.pinInput}
                  error={Boolean(
                    (touched as any)[index] && (errors as any)[index]
                  )}
                  value={(values as any)[index]}
                  onChange={(e) => {
                    const value = e.target.value;
                    const numberRegEx = new RegExp(PIN_PATTERN);
                    if (numberRegEx.test(value)) {
                      setFieldError(index.toString(), '');
                      setFieldValue(index.toString(), value);
                      setTimeout(() => {
                        setFieldTouched(index.toString());
                      }, 100);
                      if (value !== '' && index < 5)
                        refs[index + 1].current.focus();
                    }
                  }}
                  inputRef={refs[index]}
                  variant="outlined"
                  size="small"
                  inputProps={{
                    style: { textAlign: 'center', fontSize: '16px' }
                  }}
                />
              ))}
          </Box>
          <Button
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit as any}
            disabled={loading || isSubmitting}
          >
            {t('CONFIRM')}
          </Button>
        </RootForm>
      )}
    </Formik>
  );
};

export default VerifyEmailForm;
