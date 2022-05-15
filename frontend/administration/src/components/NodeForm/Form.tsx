// UI
import {
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { type FormikValues, useFormikContext } from 'formik';
import { Cluster, Device } from 'src/models';
import CustomAutoComplete from '../Autocomplete';

interface FormikProps extends FormikValues, Device {}

const NodeForm = () => {
  const { t } = useTranslation();
  const { values, handleChange, handleBlur, touched, errors, setFieldValue } =
    useFormikContext<FormikProps>();
  return (
    <form noValidate onSubmit={undefined}>
      <Grid container spacing={2} p={1}>
        <Grid item xs={12} md={6}>
          <TextField
            name="ip_address"
            label={t('IP_ADDRESS')}
            placeholder={t('IP_ADDRESS')}
            fullWidth
            required
            value={values.ip_address}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.ip_address && errors.ip_address)}
            helperText={touched.ip_address && errors.ip_address}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="port"
            label={t('PORT')}
            placeholder={t('PORT')}
            fullWidth
            required
            type="number"
            value={values.port}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.port && errors.port)}
            helperText={touched.port && errors.port}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="user"
            label={t('USER')}
            placeholder={t('USER')}
            fullWidth
            value={values.user}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.user && errors.user)}
            helperText={touched.user && errors.user}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="password"
            label={t('PASSWORD')}
            placeholder={t('PASSWORD')}
            fullWidth
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomAutoComplete
            url="devices/clusters/"
            stringifyOption={(option: Cluster) => `${option.name}`}
            onChange={(e, newValue) => {
              setFieldValue('cluster', newValue);
            }}
            autocompleteProps={{
              isOptionEqualToValue: (option: any, value: any) =>
                option?.id === value?.id,
              filterSelectedOptions: true,
              value: values.cluster
            }}
            inputProps={{
              label: t('CLUSTER'),
              name: 'cluster',
              onBlur: handleBlur,
              helperText: touched.cluster && errors.cluster,
              error: Boolean(touched.cluster && errors.cluster),
              required: true
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Stack justifyContent="center" height="100%">
            <FormControlLabel
              value={values.active}
              name="active"
              onChange={handleChange}
              control={<Checkbox checked={values.active} />}
              label={
                <Typography variant="body1" color="text.primary">
                  {t('ACTIVE')}
                </Typography>
              }
            />
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default NodeForm;
