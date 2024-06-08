import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

import { getUsers } from "../../../services/apiManageONU/getUsers";
import { getOlt } from "../../../services/apiManageONU/getOlt";
import { getCities } from "../../../services/apiManageONU/getCities";
import { IUsers } from "../../../interfaces/IUsers";
import { IOlt } from "../../../interfaces/IOlt";
import { ICities } from "../../../interfaces/ICities";
import { useError } from "../../../hooks/useError";
import { formatDateToEn } from "../../../config/formatDate";

import LoadingButton from '@mui/lab/LoadingButton';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Alert, Autocomplete, CircularProgress, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
import { DateOptions, Filter, FilterButtons, FormFilter } from "./style";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export function FilterOptions({onFilterChange}: IFilterOnuLogsProps){
    const {error, handleError, severityStatus, errorMessage } = useError();

    const [viewDate, setViewDate] = useState<any>({
        viewInitialDate: '',
        viewLastDate: ''
    });

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
        const today = dayjs();
        setViewDate({
            ...viewDate,
            viewInitialDate: today,
            viewLastDate: today
        });

        setDataFiltered({
            ...dataFiltered,
            initialDate: dayjs(today).format('DD-MM-YYYY'),
            lastDate: dayjs(today).format('DD-MM-YYYY')
        });
    }, []);

    useEffect(() => {
        let active = true;
        if (!loading) {
            return undefined;
        }

        (async () => {
            const users = await getUsers();
            if (active) {
                if(users){
                    if(users.success){
                        setUsers(users.responses.response);
                    } else {
                        setUsers([]);
                    }
                } else {
                    setUsers([]);
                }
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

    const handleUserChange = (_e: unknown, value: IUsers | null) => {
        if(value){
            setDataFiltered({
                ...dataFiltered,
                userId: value.id
            });
        }else{
            setDataFiltered({
                ...dataFiltered,
                userId: value
            });
        }
    };

    const handleCityChange = (_e: unknown, value: ICities | null) => {
        if(value){
            setDataFiltered({
                ...dataFiltered,
                cityId: value.id
            });
        }else{
            setDataFiltered({
                ...dataFiltered,
                cityId: value
            });
        }
    };

    const handleOltChange = (_e: unknown, value: IOlt | null) => {
        if(value){
            setDataFiltered({
                ...dataFiltered,
                oltId: value.id
            })
        } else {
            setDataFiltered({
                ...dataFiltered,
                oltId: value
            });
        }
    };

    const handleStateChange = (e: SelectChangeEvent<string>) => {
        setDataFiltered({
            ...dataFiltered,
            state: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!dataFiltered.initialDate || !dataFiltered.lastDate){
            handleError('error/expected-date');
        } else if(dayjs(formatDateToEn(dataFiltered.lastDate)).isBefore(dayjs(formatDateToEn(dataFiltered.initialDate)))){
            handleError('error/lastDate-isBefore-initialDate');
        } else {
            onFilterChange(dataFiltered);
        }
    };

    return(
        <Filter className="flex" onSubmit={handleSubmit}>
            <FormFilter className="flex">
                <DateOptions className="flex">
                    <DemoContainer components={['DatePicker']} sx={{width: '200px'}}>
                        <DatePicker 
                            label="Data Inicial" 
                            format="DD/MM/YYYY"
                            onChange={handleInitialDateChange}
                            value={viewDate.viewInitialDate}
                        />
                    </DemoContainer>
                    -
                    <DemoContainer components={['DatePicker']} sx={{width: '200px'}}>
                        <DatePicker 
                            label="Data Final"
                            format="DD/MM/YYYY"
                            onChange={handleLastDateChange}
                            value={viewDate.viewLastDate}
                        />
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
                    isOptionEqualToValue={(option, value) => option.name === value.name}
                    options={users}
                    getOptionLabel={(user) => user.name}
                    loading={loading}
                    renderOption={(props, option) => {
                        return (
                            <li {...props} key={option.id}>
                                {option.name}
                            </li>
                        );
                    }}
                    renderInput={(params) => {
                        return(
                            <TextField
                            {...params}
                            label="Tecnico"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                            }}
                        />
                    )}}
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
                    options={cities}
                    getOptionLabel={(city) => city.name}
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
                                    <React.Fragment>
                                        {loadingCities ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                            }}
                        />
                    )}
                />
                <Autocomplete
                    id="asynchronous-olts"
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
                    options={olts}
                    getOptionLabel={(olt) => olt.name}
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
                                    <React.Fragment>
                                        {loadingOlts ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
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
                    loadingPosition="start"
                    variant="outlined"
                    size="small"
                    startIcon={<FilterAltOutlinedIcon />}
                    >
                    Filtrar
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