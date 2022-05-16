/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

// Hooks
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';

// UI
import { Edit, InfoOutlined } from '@mui/icons-material';
import { IconButton, styled, SvgIcon, Tooltip } from '@mui/material';

// Redux
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { deleteLog, fetchLogs, updateLog } from 'src/redux/actions';

// Components
import DataGrid from 'src/components/DataGrid';
import Modal from 'src/components/Modal';
import LogForm from 'src/components/LogForm/Form';

// Forms
import { Formik } from 'formik';
import * as Yup from 'yup';

// Others
import { Log, IHeaderCell } from 'src/models';
import ApiEvent from 'src/utils/ApiEvent';
import moment from 'moment';
import { extractData, getDateFormat } from 'src/utils/helpers';

const Root = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'column'
}));

const Logs = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const LogsReducer = useSelector((state: any) => state.Logs);
  const deleteSuccess: ApiEvent = LogsReducer.deleteSuccess;
  const updateSuccess: ApiEvent = LogsReducer.updateSuccess;
  const createSuccess: ApiEvent = LogsReducer.createSuccess;
  const error: ApiEvent<{ type: string; msgs: string[] }> = LogsReducer.error;
  const { fullDatetimeFormat } = getDateFormat();

  // States
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState<any>(false);
  const [isEdit, setIsEdit] = useState<any>(false);

  // const handleOpenDelete = (payload?: string) => {
  //   setOpen({ action: 'delete', payload });
  // };

  const handleOpenInfos = (payload: Log) => {
    setIsEdit(false);
    setOpen({ action: 'infos', payload });
  };

  const handleOpenUpdate = (payload: Log) => {
    setIsEdit(true);
    setOpen({ action: 'update', payload });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitDelete = () => {
    dispatch(deleteLog(open.payload));
    setOpen(false);
  };

  const handleSubmitUpdate = (payload: any) => {
    dispatch(updateLog(payload));
  };

  const headerItems: IHeaderCell[] = [{ text: t('LOG') }, { text: t('DATE') }];

  const bodyItems: any = [
    {
      render: (item: Log) =>
        item.employee
          ? `${item?.employee_data?.first_name}, ${item?.employee_data?.last_name}`
          : t('UNKNOWN_PERSON')
    },
    {
      render: (item: Log) => moment(item.created_on).format(fullDatetimeFormat)
    }
  ];

  const customActions = (item: Log) => (
    <>
      <Tooltip title={t('UPDATE')}>
        <IconButton onClick={() => handleOpenUpdate(item)}>
          <SvgIcon>
            <Edit />
          </SvgIcon>
        </IconButton>
      </Tooltip>
      <Tooltip title={t('MORE')}>
        <IconButton onClick={() => handleOpenInfos(item)}>
          <SvgIcon>
            <InfoOutlined />
          </SvgIcon>
        </IconButton>
      </Tooltip>
    </>
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

  const LogModal = ({ isEdit }: { isEdit: boolean }) => (
    <Formik
      initialValues={{
        id: extractData(open.payload, ['id'], ''),
        employee: extractData(open.payload, ['employee_data'], ''),
        image: extractData(open.payload, ['image'], null)
      }}
      enableReinitialize
      validationSchema={Yup.object().shape({
        employee: Yup.mixed().nullable()
      })}
      onSubmit={(values: Log) => {
        try {
          handleSubmitUpdate({
            id: values.id,
            employee: values.employee ? (values.employee as any).id : null
          });
        } catch {
          //
        }
      }}
    >
      {({ handleSubmit }) => (
        <Modal
          isOpen={
            (open.action === 'update' && open.payload) ||
            open.action === 'infos'
          }
          onClose={handleClose}
          cancelText={t('CLOSE')}
          onSubmit={open.action === 'infos' ? undefined : handleSubmit}
          submitText={t('SUBMIT')}
        >
          <LogForm isEdit={open.action === 'update'} />
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
      <LogModal isEdit={isEdit} />
      <DataGrid
        title={t('LOGS')}
        fetchItems={fetchLogs}
        reducer={LogsReducer}
        headerItems={headerItems}
        bodyItems={bodyItems}
        customActions={customActions}
        externalRefresh={refresh}
      />
    </Root>
  );
};

export default Logs;
