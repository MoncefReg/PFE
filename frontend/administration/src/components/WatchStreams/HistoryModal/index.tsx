/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';

// UI
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  IconButton,
  Modal,
  SvgIcon
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { STREAM_URL } from 'src/constants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  ip: string;
}

const History = ({ isOpen, title = '', ip, onClose }: Props) => {
  return (
    <Modal open={isOpen}>
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
              <Box>
                <video
                  width="100%"
                  height="100%"
                  autoPlay
                  controls
                  style={{ borderRadius: 8 }}
                >
                  <source
                    src={`${STREAM_URL}/history?ip=${ip}`}
                    type="video/webm"
                  />
                </video>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Modal>
  );
};

export default React.memo(History);
