import { useState } from 'react';

// Hooks
import useSettings from 'src/hooks/useSettings';

// UI
import {
  Button,
  ButtonGroup,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  styled,
  SvgIcon,
  Typography
} from '@mui/material';
import { Settings as SettingsIcon, X as CloseIcon } from 'react-feather';

// Others
import { LANGUAGES, SETTINGS_DRAWER_WIDTH, THEME_OPTIONS } from 'src/constants';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

const PREFIX = 'settings-drawer';

const classes = {
  root: `${PREFIX}-root`,
  container: `${PREFIX}-container`,
  languageItem: `${PREFIX}-language-item`,
  selected: `${PREFIX}-selected`
};

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  [`& .${classes.container}`]: {
    width: SETTINGS_DRAWER_WIDTH
  },
  [`& .${classes.languageItem}`]: {
    borderRadius: 10
  },
  [`& .${classes.selected}`]: {
    borderColor: theme.palette.primary.dark,
    backgroundColor: theme.palette.action.focus
  }
}));

const SettingsDrawer = () => {
  const { t } = useTranslation();
  const { theme: settingsTheme, saveTheme } = useSettings();

  // States
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleThemeChange = (theme: any) => {
    saveTheme(theme);
  };

  const handleLanguageChange = (language: any) => {};

  return (
    <>
      <IconButton sx={{ mr: 1 }} onClick={handleOpen}>
        <SvgIcon>
          <SettingsIcon />
        </SvgIcon>
      </IconButton>
      <StyledDrawer
        className={classes.root}
        open={isOpen}
        variant="temporary"
        anchor="right"
      >
        <div className={classes.container}>
          <Stack
            justifyContent="space-between"
            flexDirection="row"
            alignItems="center"
            p={2}
          >
            <Typography>{t('SETTINGS')}</Typography>
            <IconButton onClick={handleClose}>
              <SvgIcon color="primary">
                <CloseIcon />
              </SvgIcon>
            </IconButton>
          </Stack>
          <Divider />
          <Stack spacing={3} p={2}>
            <div>
              <Typography mb={1}>{t('THEME')}</Typography>
              <ButtonGroup fullWidth>
                {Object.entries(THEME_OPTIONS).map(([key, value]) => (
                  <Button
                    key={key}
                    onClick={() => handleThemeChange(value)}
                    className={clsx({
                      [classes.selected]: value === settingsTheme
                    })}
                  >
                    {t(`THEME_OPTIONS.${key}`)}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
            <div>
              <Typography>{t('LANGUAGE')}</Typography>
              <List>
                {Object.entries(LANGUAGES).map(([key, value]) => (
                  <ListItemButton
                    key={key}
                    className={classes.languageItem}
                    onClick={() => handleLanguageChange(value)}
                  >
                    <ListItemText>{t(`LANGUAGE_OPTIONS.${key}`)}</ListItemText>
                  </ListItemButton>
                ))}
              </List>
            </div>
          </Stack>
        </div>
      </StyledDrawer>
    </>
  );
};

export default SettingsDrawer;
