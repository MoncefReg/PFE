import { useEffect, useState } from 'react';

// UI
import { Grid } from '@mui/material';

// Redux
import { useDispatch } from 'react-redux';
import { fetchClusters } from 'src/redux/actions';

// Components
import ClustersList from 'src/components/WatchStreams/ClustersList';
import StreamsList from 'src/components/WatchStreams/Streams';

// Others
import { Cluster } from 'src/models';

const WatchStreams = () => {
  const dispatch = useDispatch();

  // States
  const [cluster, setCluster] = useState<Cluster | undefined>();

  const handleSelectCluster = (c: Cluster) => {
    setCluster(c);
  };

  useEffect(() => {
    dispatch(fetchClusters({ page_size: -1 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={5}>
        <ClustersList
          handleSelectCluster={handleSelectCluster}
          cluster={cluster}
        />
      </Grid>
      <Grid item xs={12} lg={7}>
        <StreamsList cluster={cluster} />
      </Grid>
    </Grid>
  );
};

export default WatchStreams;
