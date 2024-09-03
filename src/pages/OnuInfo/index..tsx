import { Autocomplete, Button, CircularProgress, TextField } from "@mui/material";
import { Form } from "../onuDelete/style";
import React, { useEffect, useState } from "react";
import { getCities } from "../../services/apiManageONU/getCities";
import { ICities } from "../../interfaces/ICities";
import { useResponse } from "../../hooks/useResponse";
import { useLoading } from "../../hooks/useLoading";
import SendIcon from '@mui/icons-material/Send';
import { getOnuInfo } from "../../services/apiManageONU/getOnuInfo";
import { useAuth } from "../../hooks/useAuth";
import { DataField } from "./style";
import { getVendors } from "../../services/macVendors/getVendors";

export function OnuInfo(){
    const { setFetchResponseMessage } = useResponse();
    const { isLoading, startLoading, stopLoading } = useLoading();

    const [onu, setOnu] = useState([]);
    const [open, setOpen] = useState(false);
    const [cities, setCities] = useState<ICities[]>([]);
    const [form, setForm] = useState({
        cityId: '' as number | '' | null,
        serial: '',
    });

    const loadingCities = open && cities.length === 0;
    useEffect(() => {
        let active = true;
        if (!loadingCities) {
            return undefined;
        }

        (async () => {
            const response = await getCities();
            if (active) {
                if(response){
                    if(response.success){
                        setCities(response.responses.response);
                    }
                } else {
                    setFetchResponseMessage('error/no-connection-with-API');
                }
            }
        })();
        return () => {active = false;};
    }, [loadingCities]);


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

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startLoading();

        const response = await getOnuInfo({cityId: parseInt(form.cityId as string), serialNumber: form.serial});
        stopLoading();
        if(response){
            if(response.success){
                console.log(response.responses.response[0].macs[0])
                await getVendors(response.responses.response[0].macs[0].mac)
                setOnu(response.responses.response);
            } else {
                setFetchResponseMessage(response.messages.message);
            }
        } else {
            setFetchResponseMessage('error/no-connection-with-API');
        }
    }

    return(
        <>
            <Form className="flex" onSubmit={handleSubmit}>
                <div className="controller flex">
                    <Autocomplete
                        open={open}
                        sx={{ width: '250px' }}
                        onOpen={() => setOpen(true)}
                        onClose={() => setOpen(false)}
                        onChange={handleCityChange}
                        options={cities}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        getOptionLabel={(city) => city.name}
                        loading={loadingCities}
                        renderOption={(props, option) => {
                            return (
                                <li {...props} key={option.id}>
                                    {option.name}
                                </li>
                            );
                        }}
                        renderInput={(params) => {
                            return(
                                <TextField
                                    {...params}
                                    label="Cidades"
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
                        )}}
                    />
                    <TextField 
                        label="Digite o serial da ONU" 
                        sx={{width: '250px'}}
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
                        Coletar dados da ONU
                    </Button>
                }
            </Form>
            {
                onu && (
                    onu.map(onu => {
                        return(
                            <DataField className="flex">
                                <div className="basic-info flex">
                                    <p>Id: {onu.id}</p>
                                    <p>placa: {onu.slot}</p>
                                    <p>pon: {onu.pon}</p>
                                    <p></p>
                                </div>
                                <div className="details">
                                    <p>OLT rx: {onu.olt_rx}</p>
                                    <p>ONU rx: {onu.onu_rx}</p>
                                    <p>Temperatura: {onu.temperature + '°C'} </p>
                                    <p>uptime: {onu.uptime}</p>
                                    <p>voltagem: {onu.voltage + 'v'}</p>
                                    {
                                        onu.macs.map(async (mac) => {
                                            return(
                                                <div>
                                                    <p>equipamento: {mac.mac}, vlan: {mac.vlan}</p>
                                                </div>
                                            )

                                        })
                                    }
                                </div>
                            </DataField>
                        )
                    })
                )
            }
        </>
        
    )
}