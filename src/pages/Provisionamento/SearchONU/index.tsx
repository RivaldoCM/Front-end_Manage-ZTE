import React, { useState } from "react";

import { SearchONUProps } from "../../../interfaces/SearchONUProps";
import { verifyIfOnuExists } from "../../../services/apiManageONU/verifyIfOnuExists";

import { Form } from './style';
import { InputContainer } from "../../../styles/globalStyles";
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuthOnu } from "../../../hooks/useAuthOnu";

export function SearchONU(props: SearchONUProps) {
    const { authOnu, setAuthOnu, viewOnlyOlt, setViewOnlyOlt } = useAuthOnu();
    const [matchSerialNumber, setMatchSerialNumber] = useState('');
    


    const handleMapOltData: any = () => {  
        const cityIds = new Set();
        console.log(cityIds)
        return(
            viewOnlyOlt.map((option: any) => {
                if (cityIds.has(option.city_id) && option.city_id !== 10) {
                    return(
                        console.log('aq')
                    )
                } else {
                    cityIds.add(option.city_id);
                    return(
                        <MenuItem key={option.id} value={option.name}>
                            {option.name}
                        </MenuItem>
                    )

                }
            })
            

        );

    }

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => { props.setCity(e.target.value); };
    const handleMatchSerialNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => { setMatchSerialNumber(e.target.value); };


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
            verifyIfOnuExists({...props, matchSerialNumber});
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
                        {handleMapOltData()}
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