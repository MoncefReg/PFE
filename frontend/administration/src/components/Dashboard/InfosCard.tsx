import { Paper, styled, Typography } from '@mui/material';

const Root = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  gap: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column'
}));

interface Props {
  title: string;
  value: any;
}

const InfosCard = ({ title, value }: Props) => {
  return (
    <Root elevation={4}>
      <Typography color="text.primary" variant="body1">
        {title}
      </Typography>
      <Typography color="text.primary" variant="h4">
        {value}
      </Typography>
    </Root>
  );
};

export default InfosCard;
