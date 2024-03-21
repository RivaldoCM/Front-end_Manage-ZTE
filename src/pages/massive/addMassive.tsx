import { Button } from "@mui/material";
import { FormAddMassive } from "./style";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { useState } from "react";
import { InputContainer } from "../../styles/globalStyles";

export function AddMassive(){
    const [selectedTime, setSelectedTime] = useState(null);
    const [open, setOpen] = useState(false);
  
    const handleTimeChange = (newTime) => {
      setSelectedTime(newTime);
    };
  
    const handleAccept = () => {
      setOpen(false); // Fechar o picker ao aceitar a hora
    };
  
    const handleOpenPicker = () => {
      setOpen(true);
    };
    return(
        <FormAddMassive className="flex">
            <InputContainer>
                <div className="text">
                    Horario da falha:
                </div>
                <div className="content">
                    <Button onClick={handleOpenPicker}>Escolher horario</Button>
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
        </FormAddMassive>
    )
}