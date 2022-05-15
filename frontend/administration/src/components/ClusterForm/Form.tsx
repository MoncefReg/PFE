// UI
import { Grid, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { type FormikValues, useFormikContext } from 'formik';
import { Cluster } from 'src/models';

interface FormikProps extends FormikValues, Cluster {}

const ClusterForm = () => {
  const { t } = useTranslation();
  const { values, handleChange, handleBlur, touched, errors } =
    useFormikContext<FormikProps>();
  return (
    <form noValidate onSubmit={undefined}>
      <Grid container spacing={2} p={1}>
        <Grid item xs={12}>
          <TextField
            name="name"
            label={t('NAME')}
            placeholder={t('NAME')}
            fullWidth
            required
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default ClusterForm;
