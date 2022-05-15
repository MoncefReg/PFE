/* eslint-disable react-hooks/exhaustive-deps */
// UI
import { Grid, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { type FormikValues, useFormikContext } from 'formik';
import { Employee } from 'src/models';
import { useEffect, useState } from 'react';
import Files from '../useDropzone';

interface FormikProps extends FormikValues, Employee {}

const EmployeeForm = () => {
  const { t } = useTranslation();
  const { values, handleChange, handleBlur, touched, errors, setFieldValue } =
    useFormikContext<FormikProps>();
  const [Dropzone, image, setImage]: any = Files({ maxFiles: 1 });

  const [initial, setInitial] = useState(true);

  useEffect(() => {
    if (values.image) setImage([values.image]);
  }, []);

  useEffect(() => {
    if (!initial) setFieldValue('image', image[0]);
    else setInitial(false);
  }, [image]);

  return (
    <form noValidate onSubmit={undefined}>
      <Grid container spacing={2} p={1}>
        <Grid item xs={12} md={6}>
          <TextField
            name="first_name"
            label={t('FIRST_NAME')}
            placeholder={t('FIRST_NAME')}
            fullWidth
            required
            value={values.first_name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.first_name && errors.first_name)}
            helperText={touched.first_name && errors.first_name}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="last_name"
            label={t('LAST_NAME')}
            placeholder={t('LAST_NAME')}
            fullWidth
            required
            value={values.last_name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.last_name && errors.last_name)}
            helperText={touched.last_name && errors.last_name}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="email"
            label={t('EMAIL')}
            placeholder={t('EMAIL')}
            fullWidth
            required
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="mobile"
            label={t('MOBILE')}
            placeholder={t('MOBILE')}
            fullWidth
            required
            value={values.mobile}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.mobile && errors.mobile)}
            helperText={touched.mobile && errors.mobile}
          />
        </Grid>
        <Grid item xs={12}>
          {Dropzone}
        </Grid>
      </Grid>
    </form>
  );
};

export default EmployeeForm;
