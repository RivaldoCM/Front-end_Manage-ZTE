import { Filter, FormFilter } from "../onu/style";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Autocomplete, CircularProgress, FormControl, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ICities } from "../../../interfaces/ICities";
import { getCities } from "../../../services/apiManageONU/getCities";
import dayjs, { Dayjs } from "dayjs";

export function FilterMassives(){

    const [cities, setCities] = useState<ICities[]>([]);
    const [isCitiesOpen, setIsCitiesOpen] = useState(false);
    const [form, setForm] = useState<any>({
        initialDate: '',
        lastDate: '',
        problemType: '',
        cityId: 0,
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
        setForm({
            ...form,
            initialDate: dataFormat
        });
    };

    const handleLastDateChange = (date: Dayjs | null) => {
        const dataFormat = dayjs(date).format('DD-MM-YYYY');
        setForm({
            ...form,
            lastDate: dataFormat
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

    return(
        <FormFilter className="flex">
            <DemoContainer components={['DatePicker']} sx={{width: '200px'}}>
                <DatePicker 
                    label="Data Inicial" 
                    format="DD/MM/YYYY"
                    onChange={handleInitialDateChange}
                />
            </DemoContainer>
            -
            <DemoContainer components={['DatePicker']} sx={{width: '200px'}}>
                <DatePicker 
                label="Data Final"
                format="DD/MM/YYYY"
                onChange={handleLastDateChange}
            />
            </DemoContainer>
            <FormControl fullWidth sx={{ mt: 2 }}>
                <Select
                    name="problemType"
                    onChange={handleFormChange}
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
    )
}