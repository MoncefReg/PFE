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
  Grid,
  IconButton,
  styled,
  SvgIcon,
  Tooltip
} from '@mui/material';

// Redux
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  createDevice,
  deleteDevice,
  fetchDevices,
  updateDevice
} from 'src/redux/actions';

// Components
import DataGrid from 'src/components/DataGrid';
import Modal from 'src/components/Modal';
import NodeForm from 'src/components/NodeForm/Form';
import CustomAutoComplete from 'src/components/Autocomplete';

// Forms
import { Formik } from 'formik';
import * as Yup from 'yup';

// Others
import { Cluster, Device, IHeaderCell } from 'src/models';
import ApiEvent from 'src/utils/ApiEvent';
import moment from 'moment';
import { extractData, getDateFormat } from 'src/utils/helpers';

const Root = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'column'
}));

const Devices = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const DevicesReducer = useSelector((state: any) => state.Devices);
  const deleteSuccess: ApiEvent = DevicesReducer.deleteSuccess;
  const updateSuccess: ApiEvent = DevicesReducer.updateSuccess;
  const createSuccess: ApiEvent = DevicesReducer.createSuccess;
  const error: ApiEvent<{ type: string; msgs: string[] }> =
    DevicesReducer.error;
  const { fullFormat } = getDateFormat();

  // States
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState<any>(false);
  const [cluster, setCluster] = useState<any>(null);

  const handleOpenDelete = (payload?: string) => {
    setOpen({ action: 'delete', payload });
  };

  const handleOpenCreate = () => {
    setOpen({ action: 'create' });
  };

  const handleOpenUpdate = (payload: Device) => {
    setOpen({ action: 'update', payload });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitDelete = () => {
    dispatch(deleteDevice(open.payload));
    setOpen(false);
  };

  const handleSubmitCreate = (payload: any) => {
    dispatch(createDevice(payload));
  };

  const handleSubmitUpdate = (payload: any) => {
    dispatch(updateDevice(payload));
  };

  const headerItems: IHeaderCell[] = [
    { text: t('IP_ADDRESS') },
    { text: t('PORT') },
    { text: t('CLUSTER') },
    { text: t('CREATED_ON') }
  ];

  const bodyItems: any = [
    { render: (item: Device) => item.ip_address },
    { render: (item: Device) => item.port },
    { render: (item: Device) => item.cluster_data?.name },
    { render: (item: Device) => moment(item.created_on).format(fullFormat) }
  ];

  const customActions = (item: Device) => (
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
        ip_address: '',
        port: '',
        user: '',
        password: '',
        cluster: undefined,
        active: false
      }}
      validationSchema={Yup.object().shape({
        ip_address: Yup.string().required(),
        port: Yup.number().min(1).max(65535).required().integer(),
        password: Yup.string(),
        user: Yup.string(),
        cluster: Yup.mixed().required()
      })}
      onSubmit={(values: Device) => {
        try {
          handleSubmitCreate({ ...values, cluster: values.cluster?.id });
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
          <NodeForm />
        </Modal>
      )}
    </Formik>
  );

  const UpdateModal = () => (
    <Formik
      initialValues={{
        ip_address: extractData(open.payload, ['ip_address'], ''),
        port: extractData(open.payload, ['port'], ''),
        user: extractData(open.payload, ['user'], ''),
        password: extractData(open.payload, ['password'], ''),
        cluster: extractData(open.payload, ['cluster_data'], undefined),
        active: extractData(open.payload, ['active'], false)
      }}
      enableReinitialize
      validationSchema={Yup.object().shape({
        ip_address: Yup.string().required(),
        port: Yup.number().min(1).max(65535).required().integer(),
        password: Yup.string().nullable(),
        user: Yup.string().nullable(),
        cluster: Yup.mixed().required(),
        active: Yup.boolean().required()
      })}
      onSubmit={(values: Device) => {
        try {
          handleSubmitUpdate({ ...values, cluster: values.cluster?.id });
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
          <NodeForm />
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
      <DeleteDialog />
      <CreateModal />
      <UpdateModal />
      <DataGrid
        title={t('DEVICES')}
        fetchItems={fetchDevices}
        reducer={DevicesReducer}
        headerItems={headerItems}
        bodyItems={bodyItems}
        customActions={customActions}
        externalRefresh={refresh}
        params={cluster ? { cluster: cluster.id } : {}}
        action={action}
        filters={
          <Grid
            item
            xs={12}
            md={6}
            sx={{ mt: 4 }}
            justifyContent="flex-end"
            alignItems="center"
            display="flex"
            flexDirection="row"
          >
            <CustomAutoComplete
              url="devices/clusters/"
              stringifyOption={(option: Cluster) => `${option.name}`}
              onChange={(e, newValue) => {
                setCluster(newValue);
                setRefresh((state) => !state);
              }}
              autocompleteProps={{
                isOptionEqualToValue: (option: any, value: any) =>
                  option?.id === value?.id,
                filterSelectedOptions: true,
                value: cluster,
                sx: { maxWidth: 350 }
              }}
              inputProps={{
                label: t('CLUSTER'),
                sx: { maxWidth: 350 }
              }}
            />
          </Grid>
        }
      />
    </Root>
  );
};

export default Devices;
