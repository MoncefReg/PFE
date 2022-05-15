import React, { useState, useCallback } from 'react';

// Hooks
import { useTranslation } from 'react-i18next';

// UI
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography
} from '@mui/material';
import { FileCopy, HighlightOff } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Others
import { useDropzone } from 'react-dropzone';
import PerfectScrollbar from 'react-perfect-scrollbar';
import clsx from 'clsx';

const PREFIX = 'DROPZONE';

const classes = {
  dropZone: `${PREFIX}-root`,
  dragActive: `${PREFIX}-drag-active`
};

const DropZoneWrapper = styled('div')(({ theme }) => ({
  [`&.${classes.dropZone}`]: {
    border: `1px dashed ${theme.palette.divider}`,
    padding: theme.spacing(6),
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    transition: '400ms background-color',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      opacity: 0.5,
      cursor: 'pointer'
    }
  },
  [`&.${classes.dragActive}`]: {
    backgroundColor: theme.palette.action.active,
    opacity: 0.5
  }
}));

const StyledButtonWrapper = styled('div')``;

const DropZone = (maxFiles: number, accept: any) => {
  const [files, setFiles] = useState<any[]>([]);

  const { t } = useTranslation();
  const handleDrop = useCallback(
    (acceptedFiles: any) => {
      if (files.length < maxFiles)
        setFiles((prevFiles) => [...prevFiles].concat(acceptedFiles));
    },
    [maxFiles, files]
  );

  const handleRemoveAll = () => {
    setFiles([]);
  };

  const handleRemove = (key: any) => {
    if (files.length === 1) setFiles([]);
    setFiles(files.filter((elm, index) => index !== key));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept,
    maxFiles
  });

  const getImage = (url: string) => {
    const image: any = new Image();
    image.src = url;
    image.size = image.width * image.height;
    image.name = url.split('/')[url.split('/').length - 1];
    return image;
  };

  const markup = (
    <div>
      <DropZoneWrapper
        className={clsx(classes.dropZone, {
          'DROPZONE-drag-active': isDragActive
        })}
        {...getRootProps()}
      >
        <input {...getInputProps()} hidden />
        <div>
          <Typography gutterBottom variant="h3">
            {t('SELECT_FILES')}
          </Typography>
          <Box mt={2}>
            <Typography color="textPrimary" variant="body1">
              {t('DROP_OR_CLICK_MESSAGE')}
            </Typography>
          </Box>
        </div>
      </DropZoneWrapper>
      {files.length > 0 && (
        <>
          <PerfectScrollbar options={{ suppressScrollX: true }}>
            <List
              sx={{
                maxHeight: 320
              }}
            >
              {files.map((file, i) => (
                <ListItem divider={i < files.length - 1} key={i}>
                  <ListItemIcon>
                    <FileCopy />
                  </ListItemIcon>
                  <ListItemText
                    primary={file.name ? file.name : getImage(file).name}
                    primaryTypographyProps={{ variant: 'h5' }}
                  />
                  <Tooltip title={t('DELETE')}>
                    <IconButton edge="end" onClick={() => handleRemove(i)}>
                      <HighlightOff />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              ))}
            </List>
          </PerfectScrollbar>
          <StyledButtonWrapper
            sx={{
              mt: 2,
              display: 'flex',
              justifyContent: 'flex-end',
              '& > * + *': {
                ml: 2
              }
            }}
          >
            <Button onClick={handleRemoveAll} variant="contained">
              {t('REMOVE_ALL')}
            </Button>
          </StyledButtonWrapper>
        </>
      )}
    </div>
  );

  return [markup, files, setFiles];
};

export default DropZone;
