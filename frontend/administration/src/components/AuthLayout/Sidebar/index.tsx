import { useMemo } from 'react';

// UI
import {
  Box,
  Container,
  Drawer,
  type DrawerProps,
  IconButton,
  styled,
  SvgIcon,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Menu as MenuIcon } from 'react-feather';

// Components
// import { ReactComponent as Logo } from 'src/assets/images/Logo.svg';

// Others
import { useTranslation } from 'react-i18next';
import PerfectScrollBar from 'react-perfect-scrollbar';
import RenderItems from './ItemsList';
import useSidebar from 'src/hooks/useSidebar';
import { SidebarItem } from 'src/models/Sidebar';
import { SIDEBAR_WIDTH } from 'src/constants';

// Styled
const PREFIX = 'layout-drawer';

const classes = {
  root: `${PREFIX}-root`,
  container: `${PREFIX}-content-container`,
  icon: `${PREFIX}-icon`
};

interface RootProps extends DrawerProps {
  sidebarcollpased: boolean;
}

const Root = styled(Drawer)<RootProps>(({ theme, sidebarcollpased }) => ({
  [`&.${classes.root}`]: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  [`& .${classes.container}`]: {
    width:
      (sidebarcollpased ? SIDEBAR_WIDTH.collapsed : SIDEBAR_WIDTH.full) - 1,
    padding: `${theme.spacing(3)} 0px`,
    transition: 'width .3s ease-out'
  },
  [`& .${classes.icon}`]: {
    color: theme.palette.text.primary
  }
}));

const Sidebar = () => {
  const { handleCollapse, isCollapsed: sidebarcollpased } = useSidebar();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const { t } = useTranslation();

  const SidebarItemsList: SidebarItem[] = useMemo(
    () => [
      {
        link: '/dashboard',
        text: t('SIDEBAR_ITEMS.DASHBOARD')
      },
      {
        link: '/employees',
        text: t('SIDEBAR_ITEMS.EMPLOYEES')
      },
      {
        link: '/clusters',
        text: t('SIDEBAR_ITEMS.CLUSTERS')
      },
      {
        link: '/devices',
        text: t('SIDEBAR_ITEMS.DEVICES')
      },
      {
        link: '/history',
        text: t('SIDEBAR_ITEMS.LOG_HISTORY')
      },
      {
        link: '/watch',
        text: t('SIDEBAR_ITEMS.WATCH_LIVE')
      }
    ],
    [t]
  );

  const sidebarContent = (isMobile: boolean) => (
    <PerfectScrollBar options={{ suppressScrollX: true }}>
      <Container className={classes.container}>
        <Box
          px={sidebarcollpased && !isMobile ? '10px' : '20px'}
          mb={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* <Logo /> */}
          <IconButton onClick={handleCollapse}>
            <SvgIcon>
              <MenuIcon className={classes.icon} />
            </SvgIcon>
          </IconButton>
        </Box>
        <RenderItems items={SidebarItemsList} />
      </Container>
    </PerfectScrollBar>
  );

  return isDesktop ? (
    <Root
      sidebarcollpased={sidebarcollpased}
      open
      variant="permanent"
      anchor="left"
    >
      {sidebarContent(false)}
    </Root>
  ) : (
    <Root
      sidebarcollpased={false}
      open={sidebarcollpased}
      variant="temporary"
      anchor="left"
    >
      {sidebarContent(true)}
    </Root>
  );
};

export default Sidebar;
