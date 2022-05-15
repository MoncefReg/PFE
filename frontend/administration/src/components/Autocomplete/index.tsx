import React, { useEffect, useState } from 'react';

// UI
import { CircularProgress, TextField } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useSnackbar } from 'notistack';
import fetcher from 'src/utils/fetcher';
import { useTranslation } from 'react-i18next';

interface Props {
  filterOptionsProp?: any;
  inputProps: any;
  autocompleteProps: any;
  url: string;
  requestParams?: object;
  stringifyOption: (option: any) => string;
  onChange: (...params: any) => void;
}

const CustomAutoComplete = ({
  filterOptionsProp,
  inputProps,
  autocompleteProps,
  url,
  requestParams = {},
  stringifyOption,
  onChange
}: Props) => {
  const filter = createFilterOptions({
    ...filterOptionsProp
  });
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  // States
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [moreEnabled, setMoreEnabled] = useState(true);

  useEffect(() => {
    setLoading(true);
    const requestOptions = {
      ...requestParams,
      page_size: pageSize
    };
    if (search) Object.assign(requestOptions, { search });
    fetcher
      .get(url, {
        params: { ...requestOptions }
      })
      .then((res: any) => {
        setLoading(false);
        setOptions([...res.data.results] as any);
        setMoreEnabled(() => Boolean(res.data.next));
      })
      .catch(() => {
        enqueueSnackbar(t('ERRORS.UNKNOWN_ERROR'), { variant: 'error' });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, pageSize]);

  return (
    <Autocomplete
      {...autocompleteProps}
      getOptionLabel={(option: any) => {
        if (option?.loadOption) return option?.text;
        return stringifyOption(option);
      }}
      onChange={(e, newValue: any) => {
        if (autocompleteProps.multiple && [...newValue].pop()?.loadOption) {
          setPageSize((state) => state + 7);
          return;
        }
        if (newValue?.loadOption) {
          setPageSize((state) => state + 7);
          return;
        }
        // if (newValue?.redirect) history.push(addOptionURL);
        onChange(e, newValue);
      }}
      options={[...options]}
      loading={loading}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        // const inputValue = params?.inputValue;

        // if (addOptionURL && inputValue)
        //   filtered.push({
        //     text: `${labels.add} "${inputValue}"`,
        //     redirect: true
        //   });

        if (moreEnabled)
          filtered.push({ text: t('LOAD_MORE'), loadOption: true });

        return filtered;
      }}
      fullWidth
      disableCloseOnSelect={autocompleteProps?.multiple}
      renderInput={({ ...params }) => {
        const finalProps = {
          ...params,
          ...inputProps
        };
        return (
          <TextField
            {...finalProps}
            fullWidth
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              )
            }}
          />
        );
      }}
    />
  );
};

export default CustomAutoComplete;
