import { useState } from "react";
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';

import { InputContainer } from "../../styles/globalStyles";
import { FormAddMassive } from "./style";
import { FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import dayjs from "dayjs";

export function AddMassive(){
    const [selectedTime, setSelectedTime] = useState('');

    const [form, setForm] = useState({
        forecastReturn: '',
        problemTime: '',
        cityName: '',
        problemType: '',
        description: '',
        affectedLocals: '',
    });

    const [open, setOpen] = useState(false);
  
    const handleTimeChange = (newTime: any) => {
      setSelectedTime(dayjs(newTime).format('HH:mm:ss'));
    };
  
    const handleAccept = () => {
      setOpen(false);
    };
  
    const handleOpenPicker = () => {
      setOpen(true);
    };
    return(
        <FormAddMassive className="flex">
            <InputContainer>
                <div className="text">
                    Tipo de problema:
                </div>
                <div className="content flex">
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
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
                </div>
            </InputContainer>
            <InputContainer>
                <div className="text">
                    Cidade:
                </div>
                <div className="content flex">
                </div>
            </InputContainer>
            <InputContainer>
                <div className="text">
                    Locais afetados:
                </div>
                <div className="content flex">
                    <TextField id="standard-basic" label="Standard" variant="standard" />
                </div>
            </InputContainer>
            <InputContainer>
                <div className="text">
                    Horario da falha:
                </div>
                <div className="content flex">
                    <p>{selectedTime}</p>
                    <IconButton color="primary" onClick={handleOpenPicker}>
                        <AccessTimeOutlinedIcon />
                    </IconButton>
                    
                    {
                        open && (
                            <StaticTimePicker
                                className="teste"
                                ampm={false}
                                value={selectedTime}
                                onChange={handleTimeChange}
                                onAccept={handleAccept}
                                displayStaticWrapperAs='desktop'
                            />
                        )
                    }
                </div>
            </InputContainer>
            <InputContainer>
                <div className="text">
                    Previsão de retorno:
                </div>
                <div className="content flex">
                    <p>{selectedTime}</p>
                    <IconButton color="primary" onClick={handleOpenPicker}>
                        <AccessTimeOutlinedIcon />
                    </IconButton>
                    {
                        open && (
                            <StaticTimePicker
                                className="teste"
                                ampm={false}
                                value={selectedTime}
                                onChange={handleTimeChange}
                                onAccept={handleAccept}
                                displayStaticWrapperAs='desktop'
                            />
                        )
                    }
                </div>
            </InputContainer>
            <InputContainer>
                <div className="text">
                    Descrição:
                </div>
                <div className="content flex">
                </div>
            </InputContainer>
        </FormAddMassive>
    )
}