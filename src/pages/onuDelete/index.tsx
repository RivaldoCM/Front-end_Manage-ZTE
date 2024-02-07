import { useEffect, useState } from "react";

import { getOlt } from "../../services/apiManageONU/getOlt";
import { IOlt } from "../../interfaces/IOlt";
import { deleteOnu } from "../../services/apiManageONU/deleteOnu";
import { useError } from "../../hooks/useError";
import { useLoading } from "../../hooks/useLoading";
import { handleOltByCity } from "../../config/renderOltByCity";

import { Form } from "./style";
import { Alert } from "@mui/material";
import {CircularProgress} from "@mui/material";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { useAuth } from "../../hooks/useAuth";


export function OnuDelete(){
    const { error, errorMessage, severityStatus, handleError } = useError();
    const { isLoading, startLoading, stopLoading } = useLoading();
    const { user } = useAuth();

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startLoading();

        let data: any = [];

        const city = olt!.filter((olt) => olt.name.includes(form.city));

        for (let i of city) {
            let obj = {
                userId: user?.uid,
                oltId: i.id,
                cityId: i.city_id,
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
                    {handleOltByCity(olt)}
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