import { useState } from 'react';

// UI
import {
  Box,
  ButtonBase,
  Collapse,
  Divider,
  IconButton,
  Paper,
  Stack,
  styled,
  SvgIcon,
  Typography
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

// Others
import { Cluster, Device } from 'src/models';

const PREFIX = 'cluster-item';

const classes = {
  divider: `${PREFIX}-divider`,
  top: `${PREFIX}-top`,
  listWrapper: `${PREFIX}-list-wrapper`
};

const Root = styled(Paper)(({ theme }) => ({
  [`& .${classes.divider}`]: {
    borderRightWidth: theme.spacing(1 / 2),
    height: 40,
    marginRight: 24,
    borderRightColor: `#${Math.ceil(
      Math.random() * (999999 - 100001) + 100000
    )}`,
    borderRadius: 20
  },
  [`& .${classes.top}`]: {
    paddingRight: theme.spacing(1),
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItem: 'center'
  },
  [`& .${classes.listWrapper}`]: {}
}));

const NodeItem = ({ node }: { node: Device }) => {
  return <Typography variant="body2">{node.ip_address}</Typography>;
};

interface Props {
  cluster: Cluster;
  handleSelect: (c: Cluster) => void;
}

const ClusterItem = ({ cluster, handleSelect }: Props) => {
  const [open, setOpen] = useState(false);

  const handleCollapse = () => {
    setOpen((prevState) => !prevState);
  };

  const onSelect = () => {
    handleSelect(cluster);
  };

  return (
    <Root elevation={12}>
      <div className={classes.top}>
        <ButtonBase onClick={onSelect} sx={{ width: '100%', py: 1 }}>
          <Stack direction="row" alignItems="center" width="100%">
            <Divider orientation="vertical" className={classes.divider} />
            <Typography>{cluster.name}</Typography>
          </Stack>
        </ButtonBase>
        <Box p={1}>
          <IconButton onClick={handleCollapse}>
            <SvgIcon>{open ? <Remove /> : <Add />}</SvgIcon>
          </IconButton>
        </Box>
      </div>
      <Collapse in={open}>
        <Stack pl={3} pr={2} spacing={3} my={2}>
          {cluster.nodes?.map((node) => (
            <NodeItem key={node.id} node={node} />
          ))}
        </Stack>
      </Collapse>
    </Root>
  );
};

export default ClusterItem;
