import { Avatar, ButtonBase, Menu, MenuItem, styled } from '@mui/material';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { ROUTES } from 'src/constants';
import useUser from 'src/hooks/useUser';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  height: 32,
  width: 32
}));

const AccountDropdown = () => {
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setUser } = useUser();

  // States
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    try {
      setUser(null);
      navigate(ROUTES.LOGIN);
    } catch (err) {
      //
    }
  };

  return (
    <>
      <ButtonBase ref={buttonRef} onClick={handleOpen}>
        <StyledAvatar />
      </ButtonBase>
      <Menu
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        keepMounted
        PaperProps={{ sx: { width: 150 } }}
        anchorEl={buttonRef.current}
        open={isOpen}
      >
        <MenuItem
          onClick={() => {
            navigate(ROUTES.ACCOUNT);
            handleClose();
          }}
        >
          {t('ACCOUNT')}
        </MenuItem>
        <MenuItem onClick={handleLogout}>{t('LOGOUT')}</MenuItem>
      </Menu>
    </>
  );
};

export default AccountDropdown;
