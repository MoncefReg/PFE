// Hooks
import useSidebar from 'src/hooks/useSidebar';

// UI
import {
  AppBar,
  type AppBarProps,
  Hidden,
  IconButton,
  Stack,
  styled,
  SvgIcon
} from '@mui/material';
import { Menu } from 'react-feather';
import AccountDropdown from './AccountDropdown';
import SettingsDrawer from './SettingsDrawer';
import { SIDEBAR_WIDTH } from 'src/constants';

// Others

interface RootProps extends AppBarProps {
  sidebarcollpased: boolean;
}

const Root = styled(AppBar)<RootProps>(({ theme, sidebarcollpased }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: 0,
  boxShadow: 'none',
  // borderBottom: `1px solid ${theme.palette.divider}`,
  height: 60,
  padding: '0px 37px',
  transition: 'width 0.3s ease-out',
  width: `calc(100% - ${
    sidebarcollpased ? SIDEBAR_WIDTH.collapsed : SIDEBAR_WIDTH.full
  }px)`,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  [theme.breakpoints.down('lg')]: {
    width: '100%',
    padding: '0px 20px'
  }
}));

const Topbar = () => {
  const { isCollapsed: sidebarcollpased, handleCollapse } = useSidebar();

  return (
    <Root sidebarcollpased={sidebarcollpased}>
      <Stack direction="row" alignItems="center">
        <Hidden lgUp>
          <IconButton
            onClick={handleCollapse}
            sx={{ color: 'text.primary', mr: 2 }}
          >
            <SvgIcon>
              <Menu />
            </SvgIcon>
          </IconButton>
        </Hidden>
      </Stack>
      <div>
        <SettingsDrawer />
        <AccountDropdown />
      </div>
    </Root>
  );
};

export default Topbar;
