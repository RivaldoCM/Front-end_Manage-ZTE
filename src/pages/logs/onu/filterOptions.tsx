import { useEffect, useState } from "react";
import { getUsers } from "../../../services/apiManageONU/getUsers";
import { IUsers } from "../../../interfaces/users";
import { getCities } from "../../../services/apiManageONU/getCities";
import { IOlt } from "../../../interfaces/IOlt";
import { getOlt } from "../../../services/apiManageONU/getOlt";

import { useLoading } from "../../../hooks/useLoading";

import { Autocomplete, CircularProgress, TextField, Typography } from "@mui/material";
import { Filter, FilterButtons, FormFilter } from "./style";
import { InputContainer } from "../../../styles/globalStyles";
import LoadingButton from '@mui/lab/LoadingButton';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';

export function FilterOptions(){
    const { isLoading, startLoading, stopLoading } = useLoading();

    const [users, setUsers] = useState<IUsers[]>([]);
    const [cities, setCities] = useState<any>([]);
    const [olts, setOlts] = useState<IOlt[]>([]);

    const [open, setOpen] = useState({
        userFilter: false,
        cityFilter: false,
        oltFilter: false,
    });

    const loading = open.userFilter && users.length === 0;
    const loadingCities = open.cityFilter && cities.length === 0;
    const loadingOlts = open.oltFilter && olts.length === 0;

    const handleUserFilterChange = (_e: React.SyntheticEvent, value: any) => {
        console.log(value.id)
    }

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
    
    return(
        <Filter className="flex">
            <div className="flex">
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    component="div"
                    className="flex"
                >
                    Filtros:
                </Typography>
            </div>
            <FormFilter className="flex">
                <InputContainer>
                
                </InputContainer>
                <InputContainer>
                    <div className="content">
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
                            onChange={handleUserFilterChange}
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
                    </div>
                </InputContainer>
                <InputContainer>

                    <div className="content">
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
                            onChange={handleUserFilterChange}
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
                    </div>
                </InputContainer>
                <InputContainer>
                    <div className="content">
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
                            onChange={handleUserFilterChange}
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
                    </div>
                </InputContainer>
                <FilterButtons className="flex">
                    <LoadingButton
                        loading={isLoading} 
                        loadingPosition="start"
                        variant="outlined"
                        size="small"
                        startIcon={<FilterAltOutlinedIcon />}
                    >
                        Filtrar
                    </LoadingButton>
                    <LoadingButton
                        loading={isLoading} 
                        loadingPosition="start"
                        variant="outlined"
                        size="small"
                        startIcon={<FilterAltOffOutlinedIcon />}
                    >
                        Limpar
                    </LoadingButton>
                </FilterButtons>
            </FormFilter>
        </Filter>
    )
}