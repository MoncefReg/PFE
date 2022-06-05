/* eslint-disable react-hooks/exhaustive-deps */
// UI
import { Grid, styled, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { type FormikValues, useFormikContext } from 'formik';
import { Employee, Log } from 'src/models';
import CustomAutoComplete from '../Autocomplete';

const StyledImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxHeight: 300,
  minHeight: 250,
  borderRadius: theme.spacing(1),
  objectFit: 'fill'
}));

interface FormikProps extends FormikValues, Log {}

interface Props {
  isEdit: boolean;
}

const LogForm = ({ isEdit = false }: Props) => {
  const { t } = useTranslation();
  const { values, handleBlur, touched, errors, setFieldValue } =
    useFormikContext<FormikProps>();

  return (
    <form noValidate onSubmit={undefined}>
      <Grid container spacing={2} p={1}>
        <Grid item xs={12}>
          {!isEdit ? (
            <TextField
              name="employee"
              label={t('EMPLOYEE')}
              placeholder={t('EMPLOYEE')}
              fullWidth
              value={
                values.employee
                  ? `${(values.employee as any)?.first_name}, ${
                      (values.employee as any)?.last_name
                    }`
                  : t('UNKNOWN_PERSON')
              }
              onChange={undefined}
              onBlur={undefined}
              InputProps={{ readOnly: !isEdit }}
            />
          ) : (
            <CustomAutoComplete
              url="staff/employees/"
              stringifyOption={(option: Employee) =>
                `${option?.first_name}, ${option?.last_name}`
              }
              onChange={(e, newValue) => {
                setFieldValue('employee', newValue);
              }}
              autocompleteProps={{
                isOptionEqualToValue: (option: any, value: any) =>
                  option?.id === value?.id,
                filterSelectedOptions: true,
                value: values.employee
              }}
              inputProps={{
                label: t('EMPLOYEE'),
                name: 'employee',
                onBlur: handleBlur,
                helperText: touched.employee && errors.employee,
                error: Boolean(touched.employee && errors.employee),
                required: true
              }}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <StyledImage src={values.image} alt="..." />
        </Grid>
      </Grid>
    </form>
  );
};

export default LogForm;
