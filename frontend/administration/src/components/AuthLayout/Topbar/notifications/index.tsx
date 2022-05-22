import { memo, useEffect, useRef, useState } from 'react';

// Hooks
import { useTranslation } from 'react-i18next';

// UI
import {
  Badge,
  Box,
  IconButton,
  List,
  Popover,
  SvgIcon,
  Tooltip,
  Typography
} from '@mui/material';
import { Bell } from 'react-feather';

// Redux
import { markNotificationSeen } from 'src/redux/actions';
import { useDispatch, useSelector } from 'react-redux';

// Components
import NotificationItem from './NotificationItem';

// Others
import { WS_URL } from 'src/constants';
import { INotification } from 'src/models';

const Notifications = () => {
  // States
  const [unseen, setUnseen] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const { t } = useTranslation();
  const ref = useRef(null);
  const dispatch = useDispatch();
  const reducerNotifications = useSelector(
    (state: any) => state.Notifications.notifications
  );

  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}/ws/notifications/`);

    ws.onmessage = (message: any) => {
      const cnt = JSON.parse(message?.data);
      const newNotif: INotification = {
        id: cnt?.id,
        data: {
          id: cnt?.log
        },
        seen: false,
        created_on: cnt?.date
      };
      setNotifications((prevState) => [newNotif, ...prevState]);
    };

    return () => {
      ws.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Array.isArray(notifications)) {
      const count = notifications.filter((n) => !n.seen);
      setUnseen(count.length);
    } else setUnseen(0);
  }, [notifications]);

  useEffect(() => {
    setNotifications([...reducerNotifications]);
  }, [reducerNotifications]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (notification: any) => {
    dispatch(markNotificationSeen(notification?.id));
  };

  return (
    <>
      <Tooltip title={t('NOTIFICATIONS')}>
        <IconButton sx={{ mr: 2 }} ref={ref} onClick={handleOpen}>
          <Badge badgeContent={unseen} color="primary">
            <SvgIcon>
              <Bell />
            </SvgIcon>
          </Badge>
        </IconButton>
      </Tooltip>
      <Popover
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
      >
        <Box p={2} sx={{ width: 320 }}>
          <Typography variant="h5">{t('NOTIFICATIONS')}</Typography>
        </Box>
        {notifications.length === 0 ? (
          <Box p={2}>
            <Typography variant="h6">{t('NO_NOTIFICATIONS')}</Typography>
          </Box>
        ) : (
          <>
            <List disablePadding>
              {notifications.map((notification, index: number) => {
                return (
                  <NotificationItem
                    key={index}
                    notification={notification}
                    onDelete={handleDelete}
                  />
                );
              })}
            </List>
          </>
        )}
      </Popover>
    </>
  );
};

export default memo(Notifications);
