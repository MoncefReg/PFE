// UI
import { Box, Divider, styled, Typography } from '@mui/material';
import { Cluster, Device } from 'src/models';

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
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'static/not-found.jpg';
  };

  const formatLink = (device: Device) => {
    let query = 'http://localhost:8787/video?';
    query += 'ip=' + device.ip_address;
    query += '&port=' + device.port;

    if (device.user && device.password)
      query += `&user=${device.user}&password=${device.password}`;

    return query;
  };
  return (
    <Box p={2}>
      <Typography variant="h3" color="text.primary" mb={4}>
        {cluster?.name}
      </Typography>
      <div>
        {(cluster?.nodes || []).map((n, index) => (
          <>
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
