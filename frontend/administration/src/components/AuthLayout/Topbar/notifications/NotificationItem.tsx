// UI
import {
  Avatar,
  ButtonBase,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon,
  Tooltip,
  Typography
} from '@mui/material';
import { Chat as ChatIcon, Close as CloseIcon } from '@mui/icons-material';

import { INotification } from 'src/models';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useNavigate } from 'react-router';

interface Props {
  notification: INotification;
  onDelete: (notification: INotification) => void;
}

const NotificationItem = ({ notification, onDelete }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleDelete = () => {
    onDelete(notification);
  };

  const handleRedirect = () => {
    navigate(`/history?log=${notification?.data?.id}`);
  };

  return (
    <ListItem
      divider
      secondaryAction={
        <Tooltip title={t('DELETE')}>
          <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      }
    >
      <ButtonBase onClick={handleRedirect} sx={{ textAlign: 'left' }}>
        <ListItemAvatar>
          <Avatar
            sx={{
              backgroundColor: 'secondary.main',
              color: 'secondary.contrastText'
            }}
          >
            <SvgIcon fontSize="small">
              <ChatIcon />
            </SvgIcon>
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <div>
              <Typography variant="body1">
                {t('NOTIFICATIONS_MESSAGES.UNKOWN_ACCESS')}
              </Typography>
            </div>
          }
          secondary={moment(notification.created_on).fromNow()}
        />
      </ButtonBase>
    </ListItem>
  );
};

export default memo(NotificationItem);
