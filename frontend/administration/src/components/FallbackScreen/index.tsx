import { LinearProgress, styled } from '@mui/material';

const PREFIX = 'fallback';

const classes = {
  root: `${PREFIX}-root`,
  progress: `${PREFIX}-progress-bar`
};

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.background.default
  },
  [`& .${classes.progress}`]: {
    maxWidth: 500,
    minWidth: 400
  }
}));

const FallbackScreen = () => {
  return (
    <Root className={classes.root}>
      <LinearProgress className={classes.progress} />
    </Root>
  );
};

export default FallbackScreen;
