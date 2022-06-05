import { styled } from '@mui/material';
import AuthGuard from 'src/components/AuthGuard';
import Sidebar from 'src/components/AuthLayout/Sidebar';
import Topbar from 'src/components/AuthLayout/Topbar';
import { SIDEBAR_WIDTH } from 'src/constants';
import useSidebar from 'src/hooks/useSidebar';

const PREFIX = 'auth-layout';

const classes = {
  root: `${PREFIX}-root`,
  content: `${PREFIX}-content`
};

interface ThemeProps extends React.HTMLAttributes<HTMLElement> {
  sidebarcollapsed: number;
}

const Root = styled('div')<ThemeProps>(({ theme, sidebarcollapsed }) => ({
  [`&.${classes.root}`]: {
    minHeight: '100vh',
    width: '100%',
    background: theme.palette.background.default
  },
  [`& .${classes.content}`]: {
    position: 'relative',
    paddingLeft: sidebarcollapsed
      ? SIDEBAR_WIDTH.collapsed
      : SIDEBAR_WIDTH.full,
    paddingTop: 60,
    paddingBottom: 0,
    transition: 'padding .3s ease-out',
    [theme.breakpoints.down('lg')]: {
      paddingLeft: 0
    }
  }
}));

const AuthLayout = ({ children }: { children: JSX.Element }) => {
  const { isCollapsed } = useSidebar();

  return (
    <AuthGuard>
      <Root className={classes.root} sidebarcollapsed={isCollapsed ? 1 : 0}>
        <Sidebar />
        <Topbar />
        <div className={classes.content}>{children}</div>
      </Root>
    </AuthGuard>
  );
};

export default AuthLayout;
