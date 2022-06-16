/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

// Hooks
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';

// UI
import { Grid, Skeleton, Stack, styled, Typography } from '@mui/material';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchStats } from 'src/redux/actions';
import { StatsState } from 'src/redux/stats/reducer';

// Components
import InfosCard from 'src/components/Dashboard/InfosCard';
import LogsStats from 'src/components/Dashboard/LogsStats';
import { Device } from 'src/models';

const Root = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'column',
  padding: '0 30px',
  marginTop: 40,
  paddingBottom: 40
}));

const Dashboard = () => {
  const [device, setDevice] = useState<Device | null>(null);
  const [loaded, setLoaded] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const reducerState = useSelector<any, StatsState>((state) => state.Stats);
  const { loading, data: stats, error } = reducerState;

  const handleChangeDevice = (device: Device) => {
    setDevice(device ?? null);
  };

  useEffect(() => {
    if (stats) setLoaded(true);
  }, [stats]);

  useEffect(() => {
    const errors = error?.getContentIfNotHandled();
    if (errors)
      errors.msgs.forEach((err) => enqueueSnackbar(err, { variant: 'error' }));
  }, [error]);

  useEffect(() => {
    dispatch(fetchStats({ ...(device && { device: device.id }) }));
  }, [device]);

  return (
    <Root>
      <Typography color="text.primary" variant="h3" mb={3}>
        {t('DASHBOARD.TITLE')}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <LogsStats
            device={device}
            handleChange={handleChangeDevice}
            logs={stats?.logs_by_employee}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            {loading && !loaded ? (
              <Skeleton variant="rectangular" height={120} />
            ) : (
              <InfosCard
                title={t('DASHBOARD.EMPLOYEES')}
                value={stats?.staff}
              />
            )}
            {loading && !loaded ? (
              <Skeleton variant="rectangular" height={120} />
            ) : (
              <InfosCard
                title={t('DASHBOARD.DEVICES')}
                value={stats?.devices}
              />
            )}
            {loading && !loaded ? (
              <Skeleton variant="rectangular" height={120} />
            ) : (
              <InfosCard
                title={t('DASHBOARD.LOGS')}
                value={stats?.logs_by_employee?.total}
              />
            )}
          </Stack>
        </Grid>
      </Grid>
    </Root>
  );
};

export default Dashboard;
