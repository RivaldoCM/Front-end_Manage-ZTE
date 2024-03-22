import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import { FormAddMassive } from "./style";
import { Autocomplete, CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from "@mui/material";
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { StaticDateTimePicker } from "@mui/x-date-pickers";
import { getCities } from "../../services/apiManageONU/getCities";
import { ICities } from "../../interfaces/ICities";
import { IAddMassive } from "../../interfaces/IAddMassiveForm";

export function AddMassive(){
    const [form, setForm] = useState<IAddMassive>({
        cityId: 0 || null,
        forecastReturn: '',
        failureTime: '',
        cityName: '',
        problemType: 'Energia',
        description: '',
        affectedLocals: ''
    });

    console.log(form)

    const [openAutoCompleteCities, setOpenAutoCompleteCities] = useState(false)
    const [open, setOpen] = useState(false);
    const [openForecastTime, setOpenForecastTime] = useState(false);
    const [cities, setCities] = useState<ICities[]>([]);

    const loadingCities = openAutoCompleteCities && cities.length === 0;
    useEffect(() => {
        (async () => {
            const cities = await getCities();
            setCities(cities);
        })();
    }, [loadingCities]);

  
    const handleTimeChange = (newTime: any) => {
        setForm({
            ...form,
            failureTime: dayjs(newTime).format('DD/MM/YY - HH:mm')
        });
    };

    const handleForecastTimeChange = (newTime: any) => {
        setForm({
            ...form,
            forecastReturn: dayjs(newTime).format('DD/MM/YY - HH:mm')
        });
    };
  
    const handleCityChange = (_e: unknown, value: ICities | null) => {
        if(value){
            setForm({
                ...form,
                cityId: value.id
            });
        } else {
            setForm({
                ...form,
                cityId: value
            });
        }
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleAccept = () => {
        setOpen(false);
    };

    const handleForecastTimeAccept = () => {
        setOpenForecastTime(false);
    }
  
    const handleOpenPicker = () => {
        setOpen(true);
    };

    const handleOpenForecastPicker = () => {
        setOpenForecastTime(true);
    };

    return(
        <FormAddMassive className="flex">
            <FormControl fullWidth sx={{ mt: 2 }}>
            <Autocomplete
                id="asynchronous-cities"
                open={openAutoCompleteCities}
                onOpen={() => {setOpenAutoCompleteCities(true)}}
                onClose={() => {setOpenAutoCompleteCities(false)}}
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
            </FormControl>
            <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Tipo de problema</InputLabel>
                <Select label='Tipo de problema' onChange={handleFormChange}>
                    <MenuItem value="Parado">Parado</MenuItem>
                    <MenuItem value="Energia">Energia</MenuItem>
                    <MenuItem value="Lentidão">Lentidão</MenuItem>
                    <MenuItem value="CTO Parado">CTO Parado</MenuItem>
                    <MenuItem value="Manutenção">Manutenção</MenuItem>
                    <MenuItem value="Queda">Queda</MenuItem>
                </Select>
            </FormControl>
            <div className="flex">
                <FormControl fullWidth variant="outlined" sx={{ mt: 2, mr:1 }}>
                    <InputLabel htmlFor="outlined-adornment-password">Horario de falha</InputLabel>
                    <OutlinedInput
                        label="Horario de falha"
                        name="failureTime"
                        type='text'
                        value={form.failureTime}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton edge="end" onClick={handleOpenPicker}>
                                    <AccessTimeOutlinedIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    {
                        open && (
                            <StaticDateTimePicker
                                className="date-timer"
                                ampm={false}
                                onChange={handleTimeChange}
                                onAccept={handleAccept}
                                displayStaticWrapperAs='desktop'
                            />
                        )
                    }
                </FormControl>
                <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
                    <InputLabel htmlFor="outlined-adornment-password">Previsão de retorno</InputLabel>
                    <OutlinedInput
                        label="Previsão de retorno"
                        type='text'
                        name="forecastReturn"
                        value={form.forecastReturn}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton edge="end" onClick={handleOpenForecastPicker}>
                                    <AccessTimeOutlinedIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    {
                        openForecastTime && (
                            <StaticDateTimePicker
                                className="date-timer"
                                ampm={false}
                                onChange={handleForecastTimeChange}
                                onAccept={handleForecastTimeAccept}
                                displayStaticWrapperAs='desktop'
                            />
                        )
                    }
                </FormControl>
            </div>
            <TextField 
                label="Locais afetados. Ex: Bairros, Ruas" 
                variant="outlined"
                name="affectedLocals"
                fullWidth
                onChange={handleFormChange}
                sx={{ mt: 2 }}
            />
            <TextField
                label="Informações Adicionais"
                name="description"
                multiline    
                fullWidth
                onChange={handleFormChange}
                rows={4}
                sx={{ mt: 2 }}
            />
            <div className="flex">
                <IconButton color="error">
                    <CloseIcon />
                </IconButton>
                <IconButton color="success">
                    <TaskAltOutlinedIcon />
                </IconButton>
            </div>
        </FormAddMassive>
    )
}