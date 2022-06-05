/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

// hooks
import { useTranslation } from 'react-i18next';

// UI
import {
  Container,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  SvgIcon
} from '@mui/material';
import { Search } from '@mui/icons-material';

// Components
import DataTable from './Table';

// Redux
import { useDispatch } from 'react-redux';

// Others
import { useSnackbar } from 'notistack';
import { PAGINATION_OPTIONS } from 'src/constants';
import ApiEvent from 'src/utils/ApiEvent';
import { IHeaderCell } from 'src/models';

interface Props {
  title: string;
  reducer: any;
  fetchItems: any;
  filters?: any;
  headerItems: IHeaderCell[];
  bodyItems: any[];
  disableSearch?: boolean;
  customActions?: any;
  params?: any;
  externalRefresh?: boolean;
  action?: any;
}

interface SortValue {
  field: string;
  direction: 'asc' | 'desc';
}

const DataGrid = ({
  title,
  fetchItems,
  reducer,
  headerItems,
  bodyItems,
  customActions,
  filters,
  params,
  externalRefresh,
  disableSearch,
  action
}: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  // States
  const [sort, setSort] = useState<SortValue>({
    field: 'created_on',
    direction: 'asc'
  });
  const [data, setData] = useState({ results: [], count: 0 });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(PAGINATION_OPTIONS[0]);
  const [refresh, setRefresh] = useState(false);
  const [search, setSearch] = useState('');

  // Redux
  const dispatch = useDispatch();

  const error: null | ApiEvent<{ msgs: string[] }> = reducer?.error;

  const handleSort = (value: any) => {
    setSort((state) => ({
      field: value,
      direction:
        value !== state.field
          ? 'asc'
          : state.direction === 'asc'
          ? 'desc'
          : 'asc'
    }));
  };

  const handleChangePage = (e: any, newPage: any) => {
    setPage(newPage);
    setRefresh((state) => !state);
  };

  const handleChangeRowsPerPage = (e: any) => {
    setRowsPerPage(e.target.value);
    setPage(0);
    setRefresh((state) => !state);
  };

  const handleSearch = (event: any) => {
    setSearch(event.target.value);
    setPage(0);
    setRefresh((state) => !state);
  };

  const createOptions = () => {
    const options = {
      ordering: `${sort.direction === 'asc' ? '+' : '-'}${sort.field}`,
      page: page + 1,
      page_size: rowsPerPage,
      ...params
    };

    if (search) options.search = search;

    return options;
  };

  useEffect(() => {
    const options = createOptions();
    dispatch(fetchItems(options));
  }, [sort, refresh, externalRefresh]);

  useEffect(() => {
    if (reducer?.data) setData(reducer.data);
  }, [reducer?.data]);

  useEffect(() => {
    const errors = error?.getContentIfNotHandled();
    if (errors)
      errors.msgs.forEach((err) => enqueueSnackbar(err, { variant: 'error' }));
  }, [error]);

  return (
    <Container
      sx={{
        marginTop: { lg: 5, xs: 3 },
        paddingX: { xs: '15px !important', md: '30px !important' }
      }}
      maxWidth={false}
    >
      <Grid container spacing={0}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            mt: { xs: 4, md: 0 }
          }}
        >
          <Typography variant="h3" color="text.primary">
            {title}
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ ml: 1 }}>
            ( {`${data.count} ${t('TOTAL')}`} )
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            mt: { xs: 4, md: 0 }
          }}
        >
          {action}
        </Grid>
        {!disableSearch && (
          <Grid item xs={12} md={6} sx={{ mt: 4 }}>
            <TextField
              sx={{ maxWidth: 350 }}
              fullWidth
              name="search"
              value={search}
              onChange={handleSearch}
              placeholder={t('SEARCH_PLACEHOLDER')}
              label={t('SEARCH')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon fontSize="small" color="action">
                      <Search />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        )}
        {filters}
      </Grid>
      <DataTable
        data={data}
        headerItems={headerItems}
        bodyItems={bodyItems}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        sort={sort}
        handleSort={handleSort}
        customActions={customActions}
        t={t}
      />
    </Container>
  );
};

export default DataGrid;
