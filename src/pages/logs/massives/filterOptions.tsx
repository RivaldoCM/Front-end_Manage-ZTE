import { DateOptions, Filter, FormFilter } from "../onu/style";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Autocomplete, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ICities } from "../../../interfaces/ICities";
import { getCities } from "../../../services/apiManageONU/getCities";
import dayjs, { Dayjs } from "dayjs";
import LoadingButton from "@mui/lab/LoadingButton";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { useResponse } from "../../../hooks/useResponse";
import { formatDateToISOFormat } from "../../../config/formatDate";

export function FilterMassives({onFilterChange}: any){
    const { setFetchResponseMessage } = useResponse();

    const [cities, setCities] = useState<ICities[]>([]);
    const [isCitiesOpen, setIsCitiesOpen] = useState(false);
    const [form, setForm] = useState({
        initialDate: '',
        lastDate: '',
        problemType: '',
        cityId: 0,
    });
    const [viewDate, setViewDate] = useState<any>({
        viewInitialDate: '',
        viewLastDate: ''
    });
    
    const loadingCities = isCitiesOpen && cities.length === 0;
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

    const handleInitialDateChange = (date: Dayjs | null) => {
        const dataFormat = dayjs(date).format('DD-MM-YYYY');

        setViewDate({
            ...viewDate,
            viewLastDate: dataFormat
        })

        setForm({
            ...form,
            initialDate: formatDateToISOFormat(dataFormat, false)
        });
    };

    const handleLastDateChange = (date: Dayjs | null) => {
        const dataFormat = dayjs(date).format('DD-MM-YYYY');

        setViewDate({
            ...viewDate,
            viewLastDate: dataFormat
        });
        setForm({
            ...form,
            lastDate: formatDateToISOFormat(dataFormat, true)
        });
    };

    const handleCityChange = (_e: unknown, value: ICities | null) => {
        if(value){
            setForm({
                ...form,
                cityId: value.id
            });
        }else{
            setForm({
                ...form,
                cityId: value
            });
        }
    };

    const handleFormChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(form.initialDate && !form.lastDate || !form.initialDate && form.lastDate){
            setFetchResponseMessage('ta de sacanagem')
        } else {
            onFilterChange(form);
        }
    }

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
                <FormControl sx={{ width: 160 }}>
                    <InputLabel>Tipo de falha</InputLabel>
                    <Select
                        name="problemType"
                        label="Tipo de falha"
                        onChange={handleFormChange}
                        value={form.problemType}
                    >
                        <MenuItem value="Energia">Energia</MenuItem>
                        <MenuItem value="Rompimento">Rompimento</MenuItem>
                        <MenuItem value="Parado">Parado</MenuItem>
                        <MenuItem value="Lentidão">Lentidão</MenuItem>
                        <MenuItem value="CTO Parado">CTO Parado</MenuItem>
                        <MenuItem value="Manutenção">Manutenção</MenuItem>
                        <MenuItem value="Queda">Queda</MenuItem>
                    </Select>
                </FormControl>
                <Autocomplete
                    id="asynchronous-cities"
                    sx={{ width: 200 }}
                    open={isCitiesOpen}
                    onOpen={() => setIsCitiesOpen(true)}
                    onClose={() => setIsCitiesOpen(false)}
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
            </FormFilter>
            <LoadingButton
                type="submit"
                variant="contained"
                loadingPosition="start"
                startIcon={<FilterAltOutlinedIcon />}
                size="small"
                sx={{ mt: 2 }}
            >
                Filtrar
            </LoadingButton>
        </Filter>
    )
}