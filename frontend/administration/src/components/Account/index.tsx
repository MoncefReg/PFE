import { useState } from 'react';

// Hooks
import { useTranslation } from 'react-i18next';

// UI
import { Stack, Tab, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

// Components
import EmailForm from './Email';
import PasswordForm from './Password';

// Redux
import { useSelector } from 'react-redux';

const AccountForms = () => {
  const { t } = useTranslation();

  const profileData = useSelector<any, any>((state) => state.Auth.profileData);

  // States
  const [activeTab, setActiveTab] = useState('0');

  const handleChangeTab = (event: any, newValue: any) => {
    setActiveTab(newValue);
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h3" color="text.primary">
        {t('ACCOUNT')}
      </Typography>
      <TabContext value={activeTab}>
        <TabList onChange={handleChangeTab}>
          <Tab label={t('EMAIL')} id="email-tab" value="0" />
          <Tab label={t('PASSWORD')} id="password-tab" value="1" />
        </TabList>
        <TabPanel value="0" sx={{ p: 0 }}>
          {profileData && (
            <EmailForm
              email={profileData?.email}
              confirmed={profileData?.is_confirmed}
            />
          )}
        </TabPanel>
        <TabPanel value="1" sx={{ p: 0 }}>
          <PasswordForm />
        </TabPanel>
      </TabContext>
    </Stack>
  );
};

export default AccountForms;
