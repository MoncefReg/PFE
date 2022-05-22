// UI
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TableSortLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';

// Others
import { v4 as uuidV4 } from 'uuid';
import { PAGINATION_OPTIONS } from 'src/constants';
import { IHeaderCell } from 'src/models';

// Styled Components
const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.secondary,
  border: 'none'
}));

const StyledBodyCell = styled(TableCell)(({ theme }) => ({
  border: 'none',
  ':first-of-type': {
    borderRadius: '20px 0 0 20px'
  },
  ':last-child': {
    borderRadius: '0 20px 20px 0'
  },
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`
}));

interface Props {
  data: {
    results: any[];
    count: number;
  };
  headerItems: IHeaderCell[];
  bodyItems: any[];
  page: number;
  rowsPerPage: number;
  handleChangePage: any;
  handleChangeRowsPerPage: any;
  sort: any;
  handleSort: any;
  customActions: any;
  t: any;
}

const DataTable = ({
  data,
  headerItems,
  bodyItems,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  sort,
  handleSort,
  customActions,
  t
}: Props) => {
  return (
    <Box pb={12}>
      <Table
        sx={{
          borderCollapse: 'separate',
          borderSpacing: '0 20px'
        }}
      >
        <TableHead sx={{ position: 'relative', top: 20 }}>
          <TableRow>
            {headerItems.map(({ text, sortKey }) =>
              sortKey ? (
                <StyledHeaderCell
                  key={uuidV4()}
                  sortDirection={
                    sort.field === sortKey ? sort.direction : false
                  }
                >
                  <TableSortLabel
                    active={sort.field === sortKey}
                    direction={sort.field === sortKey ? sort.direction : 'asc'}
                    onClick={() => handleSort(sortKey)}
                  >
                    {text}
                    {sort.field === sortKey ? (
                      <Box component="span" sx={visuallyHidden}>
                        {sort.direction === 'desc'
                          ? 'sorted descending'
                          : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </StyledHeaderCell>
              ) : (
                <StyledHeaderCell key={uuidV4()}>{text}</StyledHeaderCell>
              )
            )}
            {customActions && (
              <StyledHeaderCell align="center">{t('ACTIONS')}</StyledHeaderCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {(data?.results || []).map((item) => (
            <TableRow
              key={item.id}
              sx={{
                backgroundColor: 'background.paper',
                boxShadow: (theme) => theme.shadows[10],
                borderRadius: '20px'
              }}
            >
              {bodyItems.map((cell) => (
                <StyledBodyCell key={uuidV4()}>
                  <p>{cell.render(item)}</p>
                </StyledBodyCell>
              ))}
              {customActions && (
                <StyledBodyCell align="center">
                  {customActions(item)}
                </StyledBodyCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        rowsPerPageOptions={PAGINATION_OPTIONS}
        colSpan={3}
        count={data.count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default DataTable;
