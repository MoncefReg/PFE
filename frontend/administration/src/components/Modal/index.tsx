import React from 'react';

// UI
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  Modal,
  Stack,
  SvgIcon
} from '@mui/material';
import { Close } from '@mui/icons-material';

// Others
import PropTypes from 'prop-types';

interface Props {
  children: JSX.Element;
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (...params: any) => void;
  title: string;
  submitText?: string;
  cancelText?: string;
}

const BaseModal = ({
  children,
  isOpen,
  onClose,
  onSubmit,
  title,
  submitText,
  cancelText
}: Props) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Card>
            {title && (
              <CardHeader
                title={title}
                titleTypographyProps={{ variant: 'h4' }}
                sx={{ textAlign: 'center' }}
                action={
                  <IconButton onClick={onClose}>
                    <SvgIcon>
                      <Close />
                    </SvgIcon>
                  </IconButton>
                }
              />
            )}
            <CardContent>
              <Stack spacing={2}>
                <Box>{children}</Box>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="flex-end"
                >
                  <Button onClick={onSubmit}>{submitText}</Button>
                  <Button onClick={onClose}>{cancelText}</Button>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Modal>
  );
};

BaseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string
};

BaseModal.defaultProps = {
  title: ''
};

export default React.memo(BaseModal);
