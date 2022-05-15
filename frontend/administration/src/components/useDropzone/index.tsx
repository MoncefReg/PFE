// UI
import { Box, Grid, Paper } from '@mui/material';

// Others
import FilesDropzone from './Dropzone';
import FileCard from './File';

const Files = ({
  maxFiles = 1,
  accept = {
    'image/jpeg': ['.jpeg', '.png', 'jpg'],
    'image/png': ['.jpeg', '.png', 'jpg']
  },
  showCards = false
}) => {
  const [FilesZone, files, setFiles] = FilesDropzone(maxFiles, accept);

  const markup = (
    <div>
      <Paper sx={{ p: 2 }} elevation={24}>
        <>
          {FilesZone}
          {showCards && (
            <Box mt={3}>
              <Grid container spacing={3}>
                {(files as any[]).map((file) => (
                  <Grid item key={file.id} lg={4} md={4} sm={6} xs={12}>
                    <FileCard file={file} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </>
      </Paper>
    </div>
  );

  return [markup, files, setFiles];
};

export default Files;
