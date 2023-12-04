import React, { useState } from "react";
<<<<<<< HEAD
import axios from 'axios';
import { useNavigate } from "react-router-dom";
=======
>>>>>>> admin/controller

import { SearchONUProps } from "../../../interfaces/SearchONUProps";
import { verifyIfOnuExists } from "../../../services/apiManageONU/verifyIfOnuExists";

import { Form } from './style';
import { InputContainer } from "../../../globalStyles";
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

export function SearchONU(props: SearchONUProps) {
    const [matchSerialNumber, setMatchSerialNumber] = useState('');

    const navigate = useNavigate();

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => { props.setCity(e.target.value); };
    const handleMatchSerialNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => { setMatchSerialNumber(e.target.value); };

    console.log(props.olt)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        props.setDataFromApi([]);
        props.setSerialNumber('');

        const verifyAlphaNumber = /^[a-zA-Z0-9_]+$/;
    
        if(props.isLoading){
            const err = 'warning/has-action-in-progress';
            props.handleError(err);
        }else if(!verifyAlphaNumber.test(matchSerialNumber)){
            props.handleError('info/non-expect-caracter-not-alphaNumeric');
        }else{
<<<<<<< HEAD
            props.startLoading();
            const oltData = props.OltInfo.find(option => option.label === props.city ? props.city : '')!;
            const token = localStorage.getItem('Authorization');

            await axios({
                headers:{
                    'Authorization': `Bearer ${token}`
                },
                method: "post",
                url:"http://localhost:4000/searchONU",
                data: {
                    ip: oltData.ip,
                    serialNumber: matchSerialNumber.toUpperCase(), //NECESSÁRIO PARA OLT's ZTE
                }
            })
            .then(response => {
                if(typeof(response.data) === 'string'){
                    props.handleError(response.data);
                    //RETORNA ONU NAO ENCONTRADA
                }
                props.stopLoading();
                props.setDataFromApi(response.data);
            })
            .catch(error => {
                //SÓ ENTRA AQUI SE A CONEXÃO CAIR NO MEIO DA EXECUÇÃO DE TAREFAS
                console.log(error.response.data.error)
                switch(error.response.data.error){
                    case 'Invalid Token':
                        localStorage.removeItem('Authorization');
                        props.handleError(error.response.data.error);
                        props.stopLoading();
                        setTimeout(function() {
                            navigate('/login');
                        }, 2000);
                    break;
                    case 'Invalid Secret':
                        props.handleError(error.response.data.error);
                        props.stopLoading();
                    break;
                    default:

                        props.stopLoading();
                        props.handleError('ERR_NETWORK');
                    break;
                }
            });
=======
            verifyIfOnuExists({...props, matchSerialNumber});
>>>>>>> admin/controller
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
                        {props.olt.map((option) => (
                            <MenuItem key={option.id} value={option.name}>
                                {option.name}
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