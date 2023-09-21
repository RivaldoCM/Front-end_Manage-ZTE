import React, { useState } from "react";
import axios from 'axios';

import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { InputContainer } from "../../../styles/global";
import { Form } from "./style";

export function SearchONU({ 
    setCity, 
    city, 
    setDataFromApi, 
    serialNumber, 
    handleError, 
    isLoading, 
    startLoading, 
    stopLoading, 
    OltInfo }){

    const [matchSerialNumber, setMatchSerialNumber] = useState('');

    const handleCityChange = (event) => { setCity(event.target.value); };
    const handleMatchSerialNumberChange = (e) => { setMatchSerialNumber(e.target.value); };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const verifyAlphaNumber = /^[a-zA-Z0-9_]+$/;
    
        if(isLoading){
            const err = 'warning/has-action-in-progress';
            handleError(err);
        }else if(!verifyAlphaNumber.test(matchSerialNumber)){
            handleError('info/non-expect-caracter-not-alphaNumeric');
        }else{
            startLoading();
            const oltData = OltInfo.find(option => option.label === city ? city : '');
    
            await axios.post('https://app.eterniaservicos.com.br/searchONU', {
                ip: oltData.ip,
                serialNumber: matchSerialNumber.toUpperCase(), //NECESSÁRIO PARA OLT's ZTE
            })
            .then(response => {
                if(typeof(response.data) === 'string'){
                    stopLoading();
                    handleError(response.data);
                    //RETORNA ONU NAO ENCONTRADA
                }
                stopLoading();
                setDataFromApi(response.data);
            })
            .catch(error => {
                stopLoading();
                handleError(error.code);
            });
        }
    }

    return(
        <Form onSubmit={handleSubmit} className="flex">
            <InputContainer center={1}>
                <div className="text">
                    <p>Selecione a cidade: </p>
                </div>
                <div className="content">
                    <TextField
                        id='select-city'
                        select
                        label="Cidades"
                        value={city}
                        onChange={handleCityChange}
                    >
                        {OltInfo.map((option) => (
                            <MenuItem key={option.id} value={option.label}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
            </InputContainer>
            <InputContainer>
                <div className="text">
                    <p>Digite o serial da ONU: </p>
                </div>
                <div className="content">
                    <TextField 
                        id="standard-basic" 
                        variant="standard" 
                        type="text"
                        onChange={handleMatchSerialNumberChange}
                    />
                </div>
            </InputContainer>
            {
                (isLoading && serialNumber === null ? 
                    <CircularProgress className="MUI-CircularProgress" color="primary"/>
                :
                    (matchSerialNumber.length < 4 ?
                        <Button type="submit" disabled variant="outlined" endIcon={<SearchIcon />}>
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
    )
}