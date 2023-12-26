import { useEffect, useState } from "react";
import { Form } from "./style";

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import { getOlt } from "../../services/apiManageONU/getOlt";

export function OnuDelete(){
    const [olt, setOlt] = useState([]) as any;
    const [city, setCity] = useState("");

    useEffect(() => {
        async function getAllOlts(){
            const allOlt = await getOlt('all');
            setOlt(allOlt);
            setCity('ESPERA-FELIZ');
        }
        getAllOlts();
    }, []);

    const handleCityChange = (e) => {setCity(e.target.value)}

    const handleCity: any = () => {
        if(olt){
            return(
                olt.map((value: any, index: number) => {

                    if(value.city_id === 22){
                        return(
                            <MenuItem key={index} value='TOMBOS'>
                                TOMBOS
                            </MenuItem>
                        )
                    }
                    return(
                        <MenuItem key={index} value={value.name}>
                            {value.name}
                        </MenuItem>
                    )
                })
            )
        }
    }
    
    return (
        <Form className="flex">
            <TextField
                sx={{minWidth: 'unset'}}
                id='select-city'
                select
                value={city}
                label="Cidades"
                onChange={handleCityChange}
            >
                {handleCity()}
            </TextField>
            <TextField fullWidth label="Digite o serial da ONU" id="fullWidth" />
            <IconButton aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </Form>
    )
}