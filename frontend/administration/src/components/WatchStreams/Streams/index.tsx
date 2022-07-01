import { useState } from 'react';
// UI
import { Box, Button, Divider, styled, Typography } from '@mui/material';
import { STREAM_URL } from 'src/constants';
import { Cluster, Device } from 'src/models';
import HistoryModal from '../HistoryModal';
import { useTranslation } from 'react-i18next';

interface Props {
  cluster?: Cluster;
}

const Wrapper = styled('div')(({ theme }) => ({
  height: 500,
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[10],
  borderRadius: theme.spacing(2),
  position: 'relative'
}));

const OverlayedContainer = styled('div')(({ theme }) => ({
  float: 'left',
  position: 'absolute',
  left: '0px',
  top: '0px',
  zIndex: 1000,
  padding: '4px 8px',
  height: 50,
  width: 'calc(100% - 16px)',
  borderTopRightRadius: theme.spacing(2),
  borderTopLeftRadius: theme.spacing(2),
  backgroundColor: 'rgba(220,220,220, .1)',
  backdropFilter: 'blur(5px)',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
}));

const Image = styled('img')(({ theme }) => ({
  objectFit: 'cover',
  height: 500,
  width: '100%',
  borderRadius: theme.spacing(2)
}));

const StreamsList = ({ cluster }: Props) => {
  const [ip, setIp] = useState<null | string>(null);

  const { t } = useTranslation();

  const handleOpenHistory = (val: string) => {
    setIp(val);
  };

  const handleCloseHistory = () => {
    setIp(null);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'static/not-found.jpg';
  };

  const formatLink = (device: Device) => {
    let query = `${STREAM_URL}?`;
    query += 'ip=' + device.ip_address;
    query += '&port=' + device.port;

    if (device.user && device.password)
      query += `&user=${device.user}&password=${device.password}`;

    return query;
  };
  return (
    <Box p={2}>
      {!!ip && (
        <HistoryModal
          isOpen={!!ip}
          ip={ip}
          onClose={handleCloseHistory}
          title={ip}
        />
      )}
      <Typography variant="h3" color="text.primary" mb={4}>
        {cluster?.name}
      </Typography>
      <div>
        {(cluster?.nodes || []).map((n, index) => (
          <>
            <Button
              variant="outlined"
              sx={{ mb: 2 }}
              onClick={() => handleOpenHistory(n.ip_address)}
            >
              {t('SHOW_HISTORY')}
            </Button>
            <Wrapper key={n.id}>
              <OverlayedContainer>
                <Typography>{n.ip_address}</Typography>
              </OverlayedContainer>
              <Image alt="..." src={formatLink(n)} onError={handleError} />
            </Wrapper>
            {index + 1 < (cluster?.nodes?.length as any) && (
              <Divider sx={{ my: 4 }} flexItem />
            )}
          </>
        ))}
      </div>
    </Box>
  );
};

export default StreamsList;
