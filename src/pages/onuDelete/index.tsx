import { useEffect, useState } from "react";

import { getOlt } from "../../services/apiManageONU/getOlt";
import { IOlt } from "../../interfaces/IOlt";
import { deleteOnu } from "../../services/apiManageONU/deleteOnu";
import { useError } from "../../hooks/useError";
import { useLoading } from "../../hooks/useLoading";

import { Form } from "./style";
import { Alert } from "@mui/material";
import {CircularProgress} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';

export function OnuDelete(){
    const { error, errorMessage, severityStatus, handleError } = useError();
    const { isLoading, startLoading, stopLoading } = useLoading();

    const [olt, setOlt] = useState<IOlt[]>([]);
    const [form, setForm] = useState({
        city: '',
        serial: '',
        type: ''
    });

    useEffect(() => {
        async function getAllOlts(){
            const allOlt = await getOlt('all');
            if(allOlt.success){
                setOlt(allOlt.responses.response);
                setForm({
                    ...form,
                    city: allOlt.responses.response[0].name
                })
            }else{
                setOlt([]);
                handleError('unable-load-data');
            }
        }
        getAllOlts();
    }, []);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleCity = () => {
        if (olt) {
            const onlyToDisplayOltData = olt.filter((el) => {
                if (el.city_id == 22){
                    return el.name === 'TOMBOS';
                }
                return el;
            });

            return onlyToDisplayOltData.map((value: IOlt, index: number) => {
                return (
                    <MenuItem key={index} value={value.name}>
                        {value.name}
                    </MenuItem>
                );
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startLoading();

        let data: any = [];

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

        const response = await deleteOnu(data);
        stopLoading();
        if(!response.success){
            handleError(response.messages.message);
            return;
        }
        
        handleError(response.responses.status);
    };

    return (
        <Form className="flex" onSubmit={handleSubmit}>
            <div className="controller flex">
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
            </div>
            {isLoading ?
                <CircularProgress className="MUI-CircularProgress" color="primary"/>
                :
                <Button
                    size="medium"
                    variant="contained" 
                    endIcon={<SendIcon />}
                    type="submit"
                >
                    Desprovisionar
                </Button>
            }
            {
                (error ?
                    <Alert severity={severityStatus} className="alert">{errorMessage}</Alert>
                :
                    <></>
                )
            }
        </Form>
    )
}