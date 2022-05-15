/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

// Hooks
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';

// UI
import { AddCircle, Delete, Edit } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  styled,
  SvgIcon,
  Tooltip
} from '@mui/material';

// Redux
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  createEmployee,
  deleteEmployee,
  fetchEmployees,
  updateEmployee
} from 'src/redux/actions';

// Components
import DataGrid from 'src/components/DataGrid';
import Modal from 'src/components/Modal';
import EmployeeForm from 'src/components/EmployeeForm/Form';

// Forms
import { Formik } from 'formik';
import * as Yup from 'yup';

// Others
import { Employee, IHeaderCell } from 'src/models';
import ApiEvent from 'src/utils/ApiEvent';
import moment from 'moment';
import { extractData, getDateFormat } from 'src/utils/helpers';
import { isEmpty } from 'lodash/fp';

const Root = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'column'
}));

const Employees = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const EmployeesReducer = useSelector((state: any) => state.Staff);
  const deleteSuccess: ApiEvent = EmployeesReducer.deleteSuccess;
  const updateSuccess: ApiEvent = EmployeesReducer.updateSuccess;
  const createSuccess: ApiEvent = EmployeesReducer.createSuccess;
  const error: ApiEvent<{ type: string; msgs: string[] }> =
    EmployeesReducer.error;
  const { fullFormat } = getDateFormat();

  // States
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState<any>(false);

  const handleOpenDelete = (payload?: string) => {
    setOpen({ action: 'delete', payload });
  };

  const handleOpenCreate = () => {
    setOpen({ action: 'create' });
  };

  const handleOpenUpdate = (payload: Employee) => {
    setOpen({ action: 'update', payload });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitDelete = () => {
    dispatch(deleteEmployee(open.payload));
    setOpen(false);
  };

  const handleSubmitCreate = (payload: any) => {
    dispatch(createEmployee(payload));
  };

  const handleSubmitUpdate = (payload: any) => {
    dispatch(updateEmployee(payload));
  };

  const headerItems: IHeaderCell[] = [
    { text: t('NAME') },
    { text: t('EMAIL') },
    { text: t('MOBILE') },
    { text: t('CREATED_ON') }
  ];

  const bodyItems: any = [
    { render: (item: Employee) => `${item.first_name}, ${item.last_name}` },
    { render: (item: Employee) => item.email },
    { render: (item: Employee) => item.mobile },
    { render: (item: Employee) => moment(item.created_on).format(fullFormat) }
  ];

  const customActions = (item: Employee) => (
    <>
      <Tooltip title={t('DELETE')}>
        <IconButton onClick={() => handleOpenDelete(item.id)}>
          <SvgIcon>
            <Delete />
          </SvgIcon>
        </IconButton>
      </Tooltip>
      <Tooltip title={t('UPDATE')}>
        <IconButton onClick={() => handleOpenUpdate(item)}>
          <SvgIcon>
            <Edit />
          </SvgIcon>
        </IconButton>
      </Tooltip>
    </>
  );

  const action = (
    <Box justifyContent="flex-end" display="flex">
      <Button
        variant="outlined"
        onClick={handleOpenCreate}
        startIcon={<AddCircle />}
      >
        {t('ADD')}
      </Button>
    </Box>
  );

  const DeleteDialog = () => (
    <Modal
      isOpen={open.action === 'delete'}
      onClose={handleClose}
      cancelText={t('CANCEL')}
      onSubmit={handleSubmitDelete}
      submitText={t('CONFIRM')}
    >
      {t('CONFIRM_ACTION_MESSAGE')}
    </Modal>
  );

  const CreateModal = () => (
    <Formik
      initialValues={{
        first_name: '',
        last_name: '',
        email: '',
        mobile: '',
        image: null
      }}
      validationSchema={Yup.object().shape({
        first_name: Yup.string().required(),
        last_name: Yup.string().required(),
        email: Yup.string().email().nullable(),
        mobile: Yup.string().nullable()
      })}
      onSubmit={(values: Employee) => {
        try {
          const data = { ...values };
          if (!isEmpty(values.image))
            Object.assign(data, { image: values.image });
          else delete data.image;

          handleSubmitCreate({ ...data });
        } catch {
          //
        }
      }}
    >
      {({ handleSubmit }) => (
        <Modal
          isOpen={open.action === 'create'}
          onClose={handleClose}
          cancelText={t('CANCEL')}
          onSubmit={handleSubmit}
          submitText={t('SUBMIT')}
        >
          <EmployeeForm />
        </Modal>
      )}
    </Formik>
  );

  const UpdateModal = () => (
    <Formik
      initialValues={{
        id: extractData(open.payload, ['id'], ''),
        first_name: extractData(open.payload, ['first_name'], ''),
        last_name: extractData(open.payload, ['last_name'], ''),
        email: extractData(open.payload, ['email'], ''),
        mobile: extractData(open.payload, ['mobile'], ''),
        image: extractData(open.payload, ['image'], null)
      }}
      enableReinitialize
      validationSchema={Yup.object().shape({
        first_name: Yup.string().required(),
        last_name: Yup.string().required(),
        email: Yup.string().email().nullable(),
        mobile: Yup.string().nullable()
      })}
      onSubmit={(values: Employee) => {
        try {
          const data = { ...values };
          if (!isEmpty(values.image) && typeof values.image !== 'string')
            Object.assign(data, { image: values.image });
          else delete data.image;

          handleSubmitUpdate({ ...data });
        } catch {
          //
        }
      }}
    >
      {({ handleSubmit }) => (
        <Modal
          isOpen={open.action === 'update' && open.payload}
          onClose={handleClose}
          cancelText={t('CANCEL')}
          onSubmit={handleSubmit}
          submitText={t('SUBMIT')}
        >
          <EmployeeForm />
        </Modal>
      )}
    </Formik>
  );

  useEffect(() => {
    const success = deleteSuccess?.getContentIfNotHandled();
    if (success) {
      enqueueSnackbar(t('CHANGES_SAVED_MESSAGE'), { variant: 'success' });
      setRefresh((prevState) => !prevState);
    }
  }, [deleteSuccess]);

  useEffect(() => {
    const success = createSuccess?.getContentIfNotHandled();
    if (success) {
      handleClose();
      enqueueSnackbar(t('CHANGES_SAVED_MESSAGE'), { variant: 'success' });
      setRefresh((prevState) => !prevState);
    }
  }, [createSuccess]);

  useEffect(() => {
    const success = updateSuccess?.getContentIfNotHandled();
    if (success) {
      handleClose();
      enqueueSnackbar(t('CHANGES_SAVED_MESSAGE'), { variant: 'success' });
      setRefresh((prevState) => !prevState);
    }
  }, [updateSuccess]);

  useEffect(() => {
    const errors = error?.getContentIfNotHandled();
    if (errors)
      errors.msgs.forEach((err) => enqueueSnackbar(err, { variant: 'error' }));
  }, [error]);

  return (
    <Root>
      <>
        <DeleteDialog />
        <CreateModal />
        <UpdateModal />
        <DataGrid
          title={t('EMPLOYEES')}
          fetchItems={fetchEmployees}
          reducer={EmployeesReducer}
          headerItems={headerItems}
          bodyItems={bodyItems}
          customActions={customActions}
          externalRefresh={refresh}
          action={action}
        />
      </>
    </Root>
  );
};

export default Employees;
