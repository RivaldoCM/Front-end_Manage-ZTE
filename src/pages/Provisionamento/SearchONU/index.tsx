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
import { Olt } from "../../../interfaces/olt";
import { useError } from "../../../hooks/useError";
import { useLoading } from "../../../hooks/useLoading";
import { IResponseData, IResponseError } from "../../../interfaces/IDefaultResponse";
import { Alert } from "@mui/material";

export function SearchONU(props: SearchONUProps) {
    const { authOnu, setAuthOnu, viewOnlyOlt } = useAuthOnu();
    const { isLoading, startLoading, stopLoading } = useLoading();
    const { error, errorMessage, severityStatus, handleError } = useError();

    const [matchSerialNumber, setMatchSerialNumber] = useState('');

    const handleMapOltData = () => {  
        const cityIds = new Set<number>();
        const oltNames = new Set<string>();

        if(viewOnlyOlt){
            return viewOnlyOlt.map((olt: Olt, index: number) => {
                if(!cityIds.has(olt.city_id) && !oltNames.has(olt.name)){
                    cityIds.add(olt.city_id);
                    oltNames.add(olt.name);
                    return(
                        <MenuItem key={index} value={olt.name}>
                            {olt.name}
                        </MenuItem>
                    )
                } else {
                    //OLT's DA MESMA REGIÃO POREM EM LOCAIS DIFERENTES
                    let match = olt.name.match(/([a-zA-Z]+)/);
                    for(let name of oltNames){

                        if(match && !name.includes(match[1])){
                            return(
                                <MenuItem key={index} value={match[1]}>
                                    {match[1]}
                                </MenuItem>
                            )
                        }
                    }
                }
            })
        }
    }

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setAuthOnu({
        ...authOnu,
        city: e.target.value
    })};
    const handleMatchSerialNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => { setMatchSerialNumber(e.target.value); }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        startLoading();
        props.setDataFromApi([]);
        props.setSerialNumber('');

        const verifyAlphaNumber = /^[a-zA-Z0-9_]+$/;
    
        if(isLoading){
            handleError('warning/has-action-in-progress');
        }else if(!verifyAlphaNumber.test(matchSerialNumber)){
            handleError('info/non-expect-caracter-not-alphaNumeric');
        }else{
            const olt = viewOnlyOlt!.filter((olt) => olt.name.includes(authOnu.city));

            let ips: string[] = [];

            olt.map((data) => {
                ips.push(data.host)
                setAuthOnu((prevState) => ({
                    ...prevState,
                    ip: [...prevState.ip, data.host],
                    voalleAccessPointId: [...prevState.voalleAccessPointId, data.voalleAccessPointId],
                    oltId: [...prevState.oltId, data.id],
                    cityId: data.city_id
                }));
            });

            const response: IResponseData | IResponseError = await verifyIfOnuExists({
                ip: ips, 
                oltType: authOnu.oltType, 
                matchSerialNumber: matchSerialNumber
            });
            stopLoading();

            if(!response.success){
                handleError(response.messages.message);
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
                    <TextField
                        id='select-city'
                        select
                        label="Cidades"
                        value={authOnu.city}
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
                (isLoading && props.serialNumber?.length === 0? 
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
            {
                (error ?
                    <Alert severity={severityStatus} className="alert">{errorMessage}</Alert>
                :
                    <></>
                )
            }
        </Form>
    );
}