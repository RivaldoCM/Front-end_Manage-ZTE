import React, { useEffect, useState } from "react";

import { Autocomplete, Button, CircularProgress, TextField } from "@mui/material";
import { Form } from "../onuDelete/style";

import { getCities } from "../../services/apiManageONU/getCities";
import { ICities } from "../../interfaces/ICities";
import { useResponse } from "../../hooks/useResponse";
import { useLoading } from "../../hooks/useLoading";
import SendIcon from '@mui/icons-material/Send';
import { getOnuInfo } from "../../services/apiManageONU/getOnuInfo";
import { Container, DataField, InfoStyle, Macs, Wireless } from "./style";

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
                //await getVendors(response.responses.response[0].macs[0].mac)
                setOnu(response.responses.response);
            } else {
                setFetchResponseMessage(response.messages.message);
            }
        } else {
            setFetchResponseMessage('error/no-connection-with-API');
        }
    }

    return(
        <Container>
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
                                    <p>Placa: {onu.slot}</p>
                                    <p>Pon: {onu.pon}</p>
                                    <p></p>
                                </div>
                                <div className="details">
                                    <div className="infos">
                                        <InfoStyle className="flex">
                                            <p>OLT Rx: {onu.oltRx}</p>
                                            <p>ONU Rx: {onu.onuRx}</p>
                                        </InfoStyle>
                                        <InfoStyle className="flex">
                                            <p>OLT Tx: {onu.oltTx}</p>
                                            <p>ONU Tx: {onu.oltRx}</p>
                                        </InfoStyle>
                                        <InfoStyle className="flex">
                                            <p>Temp(c°): {onu.temperature} </p>
                                            <p>Voltagem: {onu.voltage}</p>
                                        </InfoStyle>
                                        <InfoStyle className="flex">
                                            <p>Distancia: {onu.distance} </p>
                                            <p>Uptime: {onu.uptime}</p>
                                        </InfoStyle>
                                        <InfoStyle className="flex">
                                            <p>Firmware: </p>
                                            <p>modelo: {onu.model}</p>
                                        </InfoStyle>
                                    </div>
                                    <Macs className="flex">
                                        <div><h4>MAC na ONU</h4></div>
                                        {
                                            onu.macs.map(mac => {
                                                return(
                                                    <div className="underlined">
                                                        <p>Mac: {mac.mac} - vlan: {mac.vlan}</p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </Macs>
                                    <Wireless className="flex">
                                        <div><h3>Wireless</h3></div>
                                        {
                                            onu.wireless.map(wface =>{
                                                return(
                                                    <div className="interface flex">
                                                        <div><h4>{'calma'}</h4></div>
                                                        <div>
                                                            <p>SSID: {wface.name}</p>
                                                            <p>SENHA: {wface.password}</p>
                                                            <p>Autenticação: {wface.authType}</p>
                                                            <p>Encriptação: {wface.encryption}</p>
                                                            <p>Isolamento: {wface.isolation}</p>
                                                            <p>Usuários online: {wface.currentUsers}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        <div className="interface flex">
                                            <div><h4>wifi_0/2</h4></div>
                                            <div>
                                                <p>SSID: Nome do wifi</p>
                                                <p>SENHA: ta aqui tb</p>
                                                <p>Autenticação: ta aqui tb</p>
                                                <p>Encriptação: ta aqui tb</p>
                                                <p>Isolamento: ta aqui tb</p>
                                                <p>Usuários online: ta aqui tb</p>
                                            </div>
                                        </div>
                                        <div className="interface flex">
                                            <div><h4>wifi_0/2</h4></div>
                                            <div>
                                                <p>SSID: Nome do wifi</p>
                                                <p>SENHA: ta aqui tb</p>
                                                <p>Autenticação: ta aqui tb</p>
                                                <p>Encriptação: ta aqui tb</p>
                                                <p>Isolamento: ta aqui tb</p>
                                                <p>Usuários online: ta aqui tb</p>
                                            </div>
                                        </div>
                                    </Wireless>
                                </div>
                            </DataField>
                        )
                    })
                )
            }
        </Container>
        
    )
}