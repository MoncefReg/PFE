import { useMemo, useState } from 'react';
import {
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Device } from 'src/models';
import CustomAutoComplete from '../Autocomplete';

// Styled Components
const Root = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  gap: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column'
}));

const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.secondary,
  border: 'none'
}));

interface Props {
  device: Device | null;
  handleChange: (device: Device) => void;
  logs: any;
}

const LogsStats = ({ device, handleChange, logs }: Props) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const headerCells: string[] = useMemo(() => [t('EMPLOYEE'), t('COUNT')], []);

  const handleChangePage = (e: any, newPage: any) => {
    setPage(newPage);
  };

  return (
    <Root elevation={4}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography color="text.primary" variant="h5">
          {t('DASHBOARD.LOGS').concat(` (${logs?.total ?? 0})`)}
        </Typography>
        <CustomAutoComplete
          url="devices/nodes/"
          stringifyOption={(option: Device) =>
            `${option.ip_address}:${option.port}`
          }
          onChange={(e, newValue) => {
            handleChange(newValue);
            setPage(0);
          }}
          autocompleteProps={{
            isOptionEqualToValue: (option: any, value: any) =>
              option?.id === value?.id,
            filterSelectedOptions: true,
            value: device,
            sx: { maxWidth: 300 }
          }}
          inputProps={{
            label: t('DEVICE'),
            name: 'device'
          }}
        />
      </Stack>
      <div>
        <Table>
          <TableHead>
            <TableRow>
              {headerCells.map((item, index) => (
                <TableCell key={index}>{item}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(logs?.employees_stats || [])
              .slice(page * 7, (page + 1) * 7)
              .map((log: any) => {
                const {
                  employee,
                  employee__first_name: first_name,
                  employee__last_name: last_name,
                  count
                } = log;
                return (
                  <TableRow key={employee ?? 'unkown'}>
                    <StyledHeaderCell>
                      {employee
                        ? `${first_name}, ${last_name}`
                        : t('UNKNOWN_PERSON')}
                    </StyledHeaderCell>
                    <StyledHeaderCell>{count}</StyledHeaderCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          rowsPerPageOptions={[7]}
          colSpan={3}
          count={logs?.employees_stats?.length || 0}
          rowsPerPage={7}
          page={page}
          onPageChange={handleChangePage}
        />
      </div>
    </Root>
  );
};

export default LogsStats;
