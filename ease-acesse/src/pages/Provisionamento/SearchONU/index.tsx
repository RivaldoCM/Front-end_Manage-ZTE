import React, { useState } from "react";
import axios from 'axios';

import { SearchONUProps } from "../../../interfaces/SearchONUProps";

import { Form } from './style';
import { InputContainer } from "../../../globalStyles";

import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

export function SearchONU(props: SearchONUProps) {
    const [matchSerialNumber, setMatchSerialNumber] = useState('');

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => { props.setCity(e.target.value); };
    const handleMatchSerialNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => { setMatchSerialNumber(e.target.value); };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        props.setSerialNumber('');
        const verifyAlphaNumber = /^[a-zA-Z0-9_]+$/;
    
        if(props.isLoading){
            const err = 'warning/has-action-in-progress';
            props.handleError(err);
        }else if(!verifyAlphaNumber.test(matchSerialNumber)){
            props.handleError('info/non-expect-caracter-not-alphaNumeric');
        }else{
            props.startLoading();
            console.log(props.isLoading)
            const oltData = props.OltInfo.find(option => option.label === props.city ? props.city : '')!;

            await axios.post('https://app.eterniaservicos.com.br/searchONU', {
                ip: oltData.ip,
                serialNumber: matchSerialNumber.toUpperCase(), //NECESSÁRIO PARA OLT's ZTE
            })
            .then(response => {
                if(typeof(response.data) === 'string'){
                    props.stopLoading();
                    props.handleError(response.data);
                    //RETORNA ONU NAO ENCONTRADA
                }else{
                    props.stopLoading();
                    props.setDataFromApi(response.data);
                }
            })
            .catch(error => {
                props.stopLoading();
                props.handleError(error.code);
            });
        }
    }

    return (
        <Form onSubmit={handleSubmit} className="flex">
            <InputContainer center={true}>
                <div className="text">
                    <p>Selecione a cidade: </p>
                </div>
                <div className="content">
                    <TextField
                        id='select-city'
                        select
                        label="Cidades"
                        value={props.city}
                        onChange={handleCityChange}
                    >
                        {props.OltInfo.map((option) => (
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
                (props.isLoading && props.serialNumber?.length === 0? 
                    <CircularProgress className="MUI-CircularProgress" color="primary"/>
                :
                    (matchSerialNumber.length < 4 ?
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