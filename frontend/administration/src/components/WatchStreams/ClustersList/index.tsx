import { useState } from 'react';

// Hooks
import { useTranslation } from 'react-i18next';

// UI
import {
  InputAdornment,
  Stack,
  SvgIcon,
  TextField,
  Typography
} from '@mui/material';
import { Search } from '@mui/icons-material';

// Redux
import { useSelector } from 'react-redux';

// Others
import { Cluster } from 'src/models';
import ClusterItem from './ClusterItem';

interface Props {
  handleSelectCluster: (c: Cluster) => void;
  cluster?: Cluster;
}

const ClustersList = ({ handleSelectCluster, cluster }: Props) => {
  const { t } = useTranslation();
  const clusters: Cluster[] = useSelector((state: any) => state.Clusters.data);

  // States
  const [search, setSearch] = useState('');

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };

  return (
    <Stack p={2} spacing={4}>
      <Typography color="text.primary" variant="h3">
        {t('WATCH')}
      </Typography>
      <TextField
        fullWidth
        name="search"
        value={search}
        onChange={handleSearch}
        placeholder={t('SEARCH_PLACEHOLDER')}
        label={t('SEARCH')}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SvgIcon fontSize="small" color="action">
                <Search />
              </SvgIcon>
            </InputAdornment>
          )
        }}
      />
      {((Array.isArray(clusters) && clusters) || []).map((c) => (
        <ClusterItem
          key={c.id}
          cluster={c}
          handleSelect={handleSelectCluster}
        />
      ))}
    </Stack>
  );
};

export default ClustersList;
