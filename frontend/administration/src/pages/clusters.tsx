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
  createCluster,
  deleteCluster,
  fetchClusters,
  updateCluster
} from 'src/redux/actions';

// Components
import DataGrid from 'src/components/DataGrid';
import Modal from 'src/components/Modal';
import ClusterForm from 'src/components/ClusterForm/Form';

// Forms
import { Formik } from 'formik';
import * as Yup from 'yup';

// Others
import { Cluster, IHeaderCell } from 'src/models';
import ApiEvent from 'src/utils/ApiEvent';
import moment from 'moment';
import { extractData, getDateFormat } from 'src/utils/helpers';

const Root = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'column'
}));

const Clusters = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const ClustersReducer = useSelector((state: any) => state.Clusters);
  const deleteSuccess: ApiEvent = ClustersReducer.deleteSuccess;
  const updateSuccess: ApiEvent = ClustersReducer.updateSuccess;
  const createSuccess: ApiEvent = ClustersReducer.createSuccess;
  const error: ApiEvent<{ type: string; msgs: string[] }> =
    ClustersReducer.error;
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

  const handleOpenUpdate = (payload: Cluster) => {
    setOpen({ action: 'update', payload });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitDelete = () => {
    dispatch(deleteCluster(open.payload));
    setOpen(false);
  };

  const handleSubmitCreate = (payload: any) => {
    dispatch(createCluster(payload));
  };

  const handleSubmitUpdate = (payload: any) => {
    dispatch(updateCluster(payload));
  };

  const headerItems: IHeaderCell[] = [
    { text: t('NAME') },
    { text: t('CREATED_ON') }
  ];

  const bodyItems: any = [
    { render: (item: Cluster) => item.name },
    { render: (item: Cluster) => moment(item.created_on).format(fullFormat) }
  ];

  const customActions = (item: Cluster) => (
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
      initialValues={{ name: '' }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required()
      })}
      onSubmit={(values: Cluster) => {
        try {
          handleSubmitCreate({ ...values });
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
          <ClusterForm />
        </Modal>
      )}
    </Formik>
  );

  const UpdateModal = () => (
    <Formik
      initialValues={{
        id: extractData(open.payload, ['id'], ''),
        name: extractData(open.payload, ['name'], '')
      }}
      enableReinitialize
      validationSchema={Yup.object().shape({
        name: Yup.string().required()
      })}
      onSubmit={(values: Cluster) => {
        try {
          handleSubmitUpdate({ ...values });
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
          <ClusterForm />
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
      <DeleteDialog />
      <CreateModal />
      <UpdateModal />
      <DataGrid
        title={t('CLUSTERS')}
        fetchItems={fetchClusters}
        reducer={ClustersReducer}
        headerItems={headerItems}
        bodyItems={bodyItems}
        customActions={customActions}
        externalRefresh={refresh}
        action={action}
      />
    </Root>
  );
};

export default Clusters;
