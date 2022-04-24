// UI
import {
  Box,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  type ListItemProps,
  ListItemText,
  styled,
  Typography
} from '@mui/material';
import useSidebar from 'src/hooks/useSidebar';
import { useMatch, useNavigate } from 'react-router';
import clsx from 'clsx';

// Styled
const PREFIX = 'sidebar-item';

const classes = {
  root: `${PREFIX}-root`,
  buttonContent: `${PREFIX}-button-content`,
  button: `${PREFIX}-button`,
  contentWrapper: `${PREFIX}-content-wrapper`,
  text: `${PREFIX}-text`,
  icon: `${PREFIX}-icon`,
  divider: `${PREFIX}-divider`,
  active: `${PREFIX}-active`
};

interface RootProps extends ListItemProps {
  collapsed: boolean;
  itemactive: 1 | 0;
}
const Root = styled(ListItem)<RootProps>(
  ({ theme, collapsed, itemactive: active }) => ({
    [`&.${classes.root}`]: {
      width: '100%',
      padding: 0,
      minHeight: 32,
      display: 'block'
    },
    [`& .${classes.divider}`]: {
      borderRightWidth: 4,
      height: 32,
      marginRight: 7,
      borderRightColor: theme.palette.primary.main,
      visibility: active ? 'visible' : 'hidden',
      borderRadius: 20
    },
    [`& .${classes.button}`]: {
      padding: 0,
      '&:hover': {
        borderRadius: '4px'
      }
    },
    [`& .${classes.buttonContent}`]: {
      width: '100%',
      height: '100%',
      minHeight: 32,
      borderRadius: '4px',
      padding: `0px ${collapsed ? '5px' : '10px'}`,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: active ? theme.palette.primary.main : theme.palette.text.primary,
      '&:hover': {
        background: theme.palette.action.hover,
        color: theme.palette.primary.main
      }
    },
    [`& .${classes.contentWrapper}`]: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      alignItem: 'center',
      '&:hover': {
        [`& .${classes.icon}`]: {
          color: theme.palette.primary.main
        }
      }
    },
    [`& .${classes.text}`]: {
      textAlign: 'left'
    },
    [`& .${classes.icon}`]: {
      color: active ? theme.palette.primary.main : theme.palette.text.primary,
      marginRight: collapsed ? 'auto' : '16px',
      marginLeft: collapsed ? 'auto' : 0,
      minWidth: 20
    },
    [`& .${classes.active}`]: {
      background: theme.palette.action.hover
    }
  })
);

interface ItemProps {
  text: string;
  icon?: any;
  link: string;
}
const Item = ({ text, icon: Icon, link }: ItemProps) => {
  const { isCollapsed } = useSidebar();
  const navigate = useNavigate();

  const active = useMatch({ path: `${link}`, caseSensitive: true });

  const handleItemClick = () => {
    navigate(link);
  };

  return (
    <Root
      className={classes.root}
      disableGutters
      disablePadding
      collapsed={isCollapsed}
      itemactive={active ? 1 : 0}
    >
      <Box className={classes.contentWrapper}>
        <Divider orientation="vertical" className={classes.divider} />
        <ListItemButton onClick={handleItemClick} className={classes.button}>
          <Box
            className={clsx(classes.buttonContent, {
              [classes.active]: Boolean(active)
            })}
          >
            <ListItemIcon className={classes.icon}>
              {Icon && <Icon size={20} sx={{ width: 20, height: 20 }} />}
            </ListItemIcon>
            <ListItemText
              className={classes.text}
              primary={<Typography>{text}</Typography>}
            />
          </Box>
        </ListItemButton>
      </Box>
    </Root>
  );
};

export default Item;
