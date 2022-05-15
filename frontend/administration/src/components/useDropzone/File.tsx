import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography
} from '@mui/material';

const FileCard = ({ file, ...rest }: any) => {
  const getImage = (url: string) => {
    const image: any = new Image();
    image.src = url;
    image.size = image.width * image.height;
    image.name = url.split('/')[url.split('/').length - 1];
    return image;
  };

  return (
    <Card {...rest}>
      <CardMedia
        sx={{
          height: 250
        }}
        image={file.path ? URL.createObjectURL(file) : file}
      />
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <div>
          <Typography variant="h5" color="text.primary">
            {file.name ? file.name : getImage(file).name}
          </Typography>
        </div>
      </CardContent>
      <Divider />
    </Card>
  );
};

export default FileCard;
