import { useEffect, useState } from "react";
import { getUsers } from "../../../services/apiManageONU/getUsers";
import { IUsers } from "../../../interfaces/users";
import { getCities } from "../../../services/apiManageONU/getCities";
import { IOlt } from "../../../interfaces/IOlt";
import { getOlt } from "../../../services/apiManageONU/getOlt";

import { useLoading } from "../../../hooks/useLoading";

import { Alert, Autocomplete, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import { DateOptions, Filter, FilterButtons, FormFilter } from "./style";
import LoadingButton from '@mui/lab/LoadingButton';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs";
import { useError } from "../../../hooks/useError";

export function FilterOptions({onFilterChange}: IFilterOnuLogsProps){
    const { isLoading, startLoading, stopLoading } = useLoading();
    const {error, handleError, severityStatus, errorMessage } = useError();

    const [hasFilter, setHasFilter] = useState(false);
    const [users, setUsers] = useState<IUsers[]>([]);
    const [cities, setCities] = useState<ICities[]>([]);
    const [olts, setOlts] = useState<IOlt[]>([]);

    const [dataFiltered, setDataFiltered] = useState<IFilterOnuLogs>({
        initialDate: '',
        lastDate: '',
        userId: 0 || null,
        cityId: 0 || null,
        oltId: 0 || null,
        state: 'null'
    });

    const [open, setOpen] = useState({
        userFilter: false,
        cityFilter: false,
        oltFilter: false,
    });

    const loading = open.userFilter && users.length === 0;
    const loadingCities = open.cityFilter && cities.length === 0;
    const loadingOlts = open.oltFilter && olts.length === 0;

    useEffect(() => {
        let active = true;
        if (!loading) {
            return undefined;
        }

        (async () => {
            const users = await getUsers();
            if (active) {
                setUsers(users);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    useEffect(() => {
        let active = true;
        if (!loadingCities) {
            return undefined;
        }

        (async () => {
            const cities = await getCities();
            if (active) {
                setCities(cities);
            }
        })();

        return () => {
            active = false;
        };
    }, [loadingCities]);

    useEffect(() => {
        let active = true;
        if (!loadingOlts) {
            return undefined;
        }

        (async () => {
            const olts = await getOlt('all');
            if (active) {
                if(olts.success){
                    setOlts(olts.responses.response);
                }
            }
        })();

        return () => {
            active = false;
        };
    }, [loadingOlts]);

    const handleInitialDateChange = (date: Dayjs | null) => {
        const dataFormat = dayjs(date).format('DD-MM-YYYY');
        setDataFiltered({
            ...dataFiltered,
            initialDate: dataFormat
        });
    };

    const handleLastDateChange = (date: Dayjs | null) => {
        const dataFormat = dayjs(date).format('DD-MM-YYYY');
        setDataFiltered({
            ...dataFiltered,
            lastDate: dataFormat
        });
    };

    const handleUserChange = (_e: unknown, value: any) => {
        setDataFiltered({
            ...dataFiltered,
            userId: value.id
        });
    };

    const handleCityChange = (_e: unknown, value: any) => {
        setDataFiltered({
            ...dataFiltered,
            cityId: value.id
        });
    };

    const handleOltChange = (_e: unknown, value: any) => {
        setDataFiltered({
            ...dataFiltered,
            oltId: value.id
        });
    };

    const handleStateChange = (e: any) => {
        setDataFiltered({
            ...dataFiltered,
            state: e.target.value
        });
    };

    const formatDate = (date: string) => {
        let dates = date.split('-');

        const day = dates[0];
        const month = dates[1];
        const year = dates[2]

        const dayJsFormatDate = `${month}/${day}/${year}`
        return dayJsFormatDate;
    }

    const handleSubmit = (e: any) =>{
        e.preventDefault();

        if(hasFilter){
            if(!dataFiltered.initialDate || !dataFiltered.lastDate){
                handleError('error/expected-date');
            } else if(dayjs(formatDate(dataFiltered.lastDate)).isBefore(dayjs(formatDate(dataFiltered.initialDate)))){
                handleError('error/lastDate-isBefore-initialDate');
            } else {
                onFilterChange(dataFiltered);
            }
        } else {
            setDataFiltered({
                initialDate: '',
                lastDate: '',
                userId: null,
                cityId: null,
                oltId: null,
                state: 'null'
            });
            onFilterChange(null);
        }
    };

    return(
        <Filter className="flex" onSubmit={handleSubmit}>
            <FormFilter className="flex">
                <DateOptions className="flex">
                    <DemoContainer components={['DatePicker']} sx={{width: '200px'}}>
                        <DatePicker label="Data Inicial" onChange={handleInitialDateChange} format="DD/MM/YYYY"/>
                    </DemoContainer>
                    -
                    <DemoContainer components={['DatePicker']} sx={{width: '200px'}}>
                        <DatePicker label="Data Final" onChange={handleLastDateChange} format="DD/MM/YYYY"/>
                    </DemoContainer>
                </DateOptions>
                <Autocomplete
                    id="asynchronous-users"
                    sx={{ width: 200 }}
                    open={open.userFilter}
                    onOpen={() => { setOpen({
                        ...open,
                        userFilter: true
                    })}}
                    onClose={() => { setOpen({
                        ...open,
                        userFilter: false
                    })}}
                    onChange={handleUserChange}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    options={users.map(user => ({id: user.id, name: user.name}))}
                    getOptionLabel={(user) => `${user.name}`}
                    loading={loading}
                    renderOption={(props, option) => {
                        return (
                            <li {...props} key={option.id}>
                                {option.name}
                            </li>
                        );
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Tecnico"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                        />
                    )}
                />
                <Autocomplete
                    id="asynchronous-cities"
                    sx={{ width: 200 }}
                    open={open.cityFilter}
                    onOpen={() => { setOpen({
                        ...open,
                        cityFilter: true
                    })}}
                    onClose={() => { setOpen({
                        ...open,
                        cityFilter: false
                    })}}
                    onChange={handleCityChange}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    options={cities.map(city => ({id: city.id, name: city.name}))}
                    getOptionLabel={(city) => `${city.name}`}
                    loading={loadingCities}
                    renderOption={(props, option) => {
                        return (
                            <li {...props} key={option.id}>
                                {option.name}
                            </li>
                        );
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Cidade"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loadingCities ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                        />
                    )}
                />
                <Autocomplete
                    id="asynchronous-cities"
                    sx={{ width: 200 }}
                    open={open.oltFilter}
                    onOpen={() => { setOpen({
                        ...open,
                        oltFilter: true
                    })}}
                    onClose={() => { setOpen({
                        ...open,
                        oltFilter: false
                    })}}
                    onChange={handleOltChange}
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    options={olts.map(olts => ({id: olts.id, name: olts.name}))}
                    getOptionLabel={(olts) => `${olts.name}`}
                    loading={loadingOlts}
                    renderOption={(props, option) => {
                        return (
                            <li {...props} key={option.id}>
                                {option.name}
                            </li>
                        );
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="OLT"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loadingOlts ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                        />
                    )}
                />
                <FormControl>
                    <InputLabel sx={{paddingTop: '8px'}} id="demo-simple-select-label">Estado</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        size="medium"
                        label="Estado"
                        value={dataFiltered.state}
                        onChange={handleStateChange}
                    >
                        <MenuItem value={'null'}>Ambos</MenuItem>
                        <MenuItem value={'true'}>Provisionadas</MenuItem>
                        <MenuItem value={'false'}>Desprovisionadas</MenuItem>
                    </Select>
                </FormControl>
            </FormFilter>
            <FilterButtons className="flex">
                <LoadingButton
                    type="submit"
                    id="send"
                    loading={isLoading} 
                    loadingPosition="start"
                    variant="outlined"
                    size="small"
                    startIcon={<FilterAltOutlinedIcon />}
                    onClick={() => {setHasFilter(true)}}
                    >
                    Filtrar
                </LoadingButton>
                <LoadingButton
                    type="submit"
                    id="clear"
                    loading={isLoading} 
                    loadingPosition="start"
                    variant="outlined"
                    size="small"
                    startIcon={<FilterAltOffOutlinedIcon />}
                    onClick={() => {setHasFilter(false)}}
                >
                    Limpar
                </LoadingButton>
            </FilterButtons>
            {
                (error ?
                    <Alert severity={severityStatus} className="alert">{errorMessage}</Alert>
                :
                    <></>
                )
            }
        </Filter>
    )
}