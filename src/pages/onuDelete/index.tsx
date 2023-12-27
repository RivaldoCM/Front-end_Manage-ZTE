import { useEffect, useState } from "react";

import { getOlt } from "../../services/apiManageONU/getOlt";
import { Olt } from "../../interfaces/olt";
import { renderCityMenuItem } from "../../config/duplicatedOltValues";

import { Form } from "./style";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';


export function OnuDelete(){
    const [olt, setOlt] = useState<Olt[]>([]);
    const [form, setForm] = useState({
        city: '',
        serial: '',
        type: ''
    });

    useEffect(() => {
        async function getAllOlts(){
            const allOlt = await getOlt('all');
            setOlt(allOlt);
            setForm(() => ({
                ...form, 
                city: "ESPERA-FELIZ"
            }));
        }
        getAllOlts();
    }, []);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleCity = () => {
        if (olt) {
            return olt.map((value: Olt, index: number) => {
                return renderCityMenuItem(value, index);
            });
        }
    };

    const handleSubmit = () => {

    }

    return (
        <Form className="flex" onSubmit={handleSubmit}>
            <TextField
                sx={{minWidth: 'unset'}}
                id='select-city'
                label="Cidades"
                name="city"
                value={form.city}
                onChange={handleFormChange}
                select
            >
                {handleCity()}
            </TextField>
            <TextField 
                label="Digite o serial da ONU" 
                id="fullWidth" 
                value={form.serial}
                name="serial"
                onChange={handleFormChange}
            />
            <Button
                size="medium"
                variant="contained" 
                endIcon={<SendIcon />}
                type="submit"
            >
                Desprovisionar
            </Button>
        </Form>
    )
}