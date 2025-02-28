import React, { useEffect, useState } from "react";

import { useAuthOnu } from "../../../hooks/useAuthOnu";
import { useLoading } from "../../../hooks/useLoading";

import { findOnu } from "../../../services/apiManageONU/findOnu";

import { isAlphaNumeric } from "../../../config/regex";

import { Form } from './style';
import { InputContainer } from "../../../styles/globalStyles";
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { getCities } from "../../../services/apiManageONU/getCities";
import { useResponse } from "../../../hooks/useResponse";
import { Autocomplete } from "@mui/material";
import { ICities } from "../../../interfaces/ICities";

export function SearchONU() {
    const { authOnu, setAuthOnu, setOnus } = useAuthOnu();
    const { isLoading, startLoading, stopLoading } = useLoading();
    const { setFetchResponseMessage } = useResponse();

    const [open, setOpen] = useState(false);
    const [cities, setCities] = useState<ICities[]>([]);
    const [form, setForm] = useState<{matchSerialNumber: string, cityId: number | null}>({
        matchSerialNumber: '',
        cityId: null
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

        return () => {
            active = false;
        };
    }, [loadingCities]);


    useEffect(() => {
        //LIMPANDO OS DADOS CASO TROQUE DE CIDADE
        setOnus([]);
        setAuthOnu({
            ...authOnu,
            oltId: '' as number | '',
            cpf: '',
            pppoeUser: '',
            pppoePassword: '',
            wifiNameBS: '',
            wifiPasswordBS: '',
            wifiName24: '',
            wifiPassword24: '',
            wifiName58: '',
            wifiPassword58: '',
            typeOnu: '',
            modelOnu: 'F601',
            modelOlt: [],
            voalleAccessPointId: ''
        });
        stopLoading();
    }, [form.cityId]);
    
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

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setAuthOnu({
            ...authOnu,
            oltId: '',
            voalleAccessPointId: ''
        });
        setOnus([]);
        startLoading();

        if(isLoading){
            setFetchResponseMessage('warning/has-action-in-progress');
        }else if(!isAlphaNumeric.test(form.matchSerialNumber)){
            setFetchResponseMessage('info/non-expect-caracter-not-alphaNumeric');
            stopLoading();
        }else if(!form.cityId){
            setFetchResponseMessage('info/required-input');
            stopLoading();
        } else {
            const response = await findOnu({
                matchSerialNumber: form.matchSerialNumber,
                cityId: form.cityId
            });
            stopLoading();

            if(response){
                if(!response.success){
                    setFetchResponseMessage(response.messages.message);
                    return;
                }
                setOnus(response.responses.response);
            } else {
                setFetchResponseMessage('error/no-connection-with-API');
            }
        }
    }

    return (
        <Form onSubmit={handleSubmit} className="flex">
            <InputContainer center={true}>
                <div className="text">
                    <p>Selecione a cidade: </p>
                </div>
                <div className="content">
                    <Autocomplete
                        open={open}
                        sx={{width: '200px'}}
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
                                    name="cnlCode"
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
                </div>
            </InputContainer>
            <InputContainer>
                <div className="text">
                    <p>Digite o serial da ONU: </p>
                </div>
                <div className="content">
                    <TextField
                        type="text"
                        name="matchSerialNumber"
                        variant="standard"
                        onChange={handleChange}
                    />
                </div>
            </InputContainer>
            {
                (isLoading ? 
                    <CircularProgress className="MUI-CircularProgress" color="primary"/>
                :
                    (form.matchSerialNumber.length < 4 ?
                        <Button disabled variant="outlined" endIcon={<SearchIcon />}>
                            Procurar ONU
                        </Button>
                    :
                        <Button type="submit" variant="outlined" endIcon={<SearchIcon />}>
                            Procurar ONU
                        </Button>
                    )
                )
            }
        </Form>
    );
}