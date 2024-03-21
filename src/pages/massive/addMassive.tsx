import { useState } from "react";
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';

import { FormAddMassive } from "./style";
import { FormControl, IconButton, Input, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import dayjs from "dayjs";

export function AddMassive(){
    const [selectedTime, setSelectedTime] = useState('');

    const [form, setForm] = useState({
        forecastReturn: '',
        failureTime: '',
        cityName: '',
        problemType: '',
        description: '',
        affectedLocals: '',
    });

    const [open, setOpen] = useState(false);
    const [openReturnTime, setOpenReturnTime] = useState(false);
  
    const handleTimeChange = (newTime: any) => {
        setForm({
            ...form,
            failureTime: dayjs(newTime).format('HH:mm:ss')
        });
    };
  
    const handleAccept = () => {
        setOpen(false);
    };
  
    const handleOpenPicker = () => {
        setOpen(true);
    };
    return(
        <FormAddMassive className="flex">
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Tipo de problema</InputLabel>
                    <Select
                        label="teste"
                    >
                        <MenuItem value={10}>Parado</MenuItem>
                        <MenuItem value={20}>Energia</MenuItem>
                        <MenuItem value={30}>Lentidão</MenuItem>
                        <MenuItem value={30}>CTO Parado</MenuItem>
                        <MenuItem value={30}>Manutenção</MenuItem>
                        <MenuItem value={30}>Queda</MenuItem>
                    </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
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
                                <StaticTimePicker
                                    className="teste"
                                    ampm={false}
                                    onChange={handleTimeChange}
                                    onAccept={handleAccept}
                                    displayStaticWrapperAs='desktop'
                                />
                            )
                        }
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Previsão de retorno</InputLabel>
                        <OutlinedInput
                            label="Previsão de retorno"
                            type='text'
                            name="forecastReturn"
                            value={form.forecastReturn}
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
                                <StaticTimePicker
                                    className="teste"
                                    ampm={false}
                                    onChange={handleTimeChange}
                                    onAccept={handleAccept}
                                    displayStaticWrapperAs='desktop'
                                />
                            )
                        }
                    </FormControl>
                    <TextField id="standard-basic" label="Standard" variant="outlined" fullWidth/>
        </FormAddMassive>
    )
}