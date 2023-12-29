import { useEffect, useState } from "react";

import { getOlt } from "../../services/apiManageONU/getOlt";
import { Olt } from "../../interfaces/olt";
import { deleteOnu } from "../../services/apiManageONU/deleteOnu";

import { Form } from "./style";
import MenuItem from '@mui/material/MenuItem';
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
            const onlyToDisplayOltData = olt.filter((el) => {
                if (el.city_id == 22){
                    return el.name === 'TOMBOS';
                }
                return el;
            }) 

            return onlyToDisplayOltData.map((value: Olt, index: number) => {
                return (
                    <MenuItem key={index} value={value.name}>
                        {value.name}
                    </MenuItem>
                );
            });
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let data = [];

        const city = olt.filter((value) => {
            if(value.name.match(/\bTOMBOS\b/g) && form.city.match(/\bTOMBOS\b/g)){
                return value;
            }else if(form.city === value.name){
                return value;
            }
        });

        for (let i of city) {
            let obj = {
                ip: i.host,
                type: i.type,
                serial: form.serial,
            };
            data.push(obj);
        }     

        deleteOnu(data);
    };

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
                required
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