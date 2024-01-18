import React, { useEffect, useState } from "react";

import { useAuthOnu } from "../../../hooks/useAuthOnu";
import { IOlt } from "../../../interfaces/IOlt";
import { useError } from "../../../hooks/useError";
import { useLoading } from "../../../hooks/useLoading";
import { getOlt } from "../../../services/apiManageONU/getOlt";
import { verifyIfOnuExists } from "../../../services/apiManageONU/verifyIfOnuExists";

import { Form } from './style';
import { InputContainer } from "../../../styles/globalStyles";
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert } from "@mui/material";
import { isAlphaNumeric } from "../../../config/regex";

export function SearchONU() {
    const { authOnu, setAuthOnu, setViewOnlyOlt, viewOnlyOlt, setOnus  } = useAuthOnu();
    const { isLoading, startLoading, stopLoading } = useLoading();
    const { error, errorMessage, severityStatus, handleError } = useError();

    const [matchSerialNumber, setMatchSerialNumber] = useState('');

    useEffect(() => {
        switch(authOnu.oltType){
            case 'zte':
                async function oltZte(){
                    const oltData = await getOlt('zte');
                    if(oltData){
                        if(oltData.success){
                            setViewOnlyOlt(oltData.responses.response);
                            setAuthOnu({
                                ...authOnu,
                                city: oltData.responses.response[0].name
                            });
                        }
                    } else {
                        setViewOnlyOlt([]);
                        handleError('error/no-connection-with-API');
                    }
                }
                oltZte();
            break;
            case 'parks':
                async function oltParks(){
                    const oltData = await getOlt('parks');
                    if(oltData){
                        if(oltData.success){
                            setViewOnlyOlt(oltData.responses.response);
                            setAuthOnu({
                                ...authOnu,
                                city: oltData.responses.response[0].name
                            })
                        }
                    } else {
                        setViewOnlyOlt([]);
                        handleError('error/no-connection-with-API');
                    }
                }
                oltParks();
            break;
        }
    }, [authOnu.oltType]);

    useEffect(() => {
        //LIMPANDO OS DADOS DE ONU'S CASO TROQUE DE CIDADE
        setOnus([]);
    }, [authOnu.city]);

    const handleMapOltData = () => {  
        const cityIds = new Set<number>();
        const oltNames = new Set<string>();

        if(viewOnlyOlt){
            return viewOnlyOlt.map((olt: IOlt, index: number) => {
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
                return null;
            });
        }
        return [];
    };

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setAuthOnu({
        ...authOnu,
        city: e.target.value
    })};
    const handleMatchSerialNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => { setMatchSerialNumber(e.target.value); }

    console.log(authOnu)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setAuthOnu({
            ...authOnu,
            ip: [],
            oltId: [],
            isPizzaBox: [],
            voalleAccessPointId: []
        });
        setOnus([]);
        startLoading();
    
        if(isLoading){
            handleError('warning/has-action-in-progress');
        }else if(!isAlphaNumeric.test(matchSerialNumber)){
            handleError('info/non-expect-caracter-not-alphaNumeric');
        }else{
            const olt = viewOnlyOlt!.filter((olt) => olt.name.includes(authOnu.city));
            let ips: string[] = [];

            olt.map((data) => {
                ips.push(data.host);
                setAuthOnu((prevState) => ({
                    ...prevState,
                    ip: [...prevState.ip, data.host],
                    voalleAccessPointId: [...prevState.voalleAccessPointId, data.voalleAccessPointId],
                    oltId: [...prevState.oltId, data.id],
                    cityId: data.city_id,
                    isPizzaBox: [...prevState.isPizzaBox, data.isPizzaBox],
                }));
            });

            const response = await verifyIfOnuExists({
                ip: ips, 
                oltType: authOnu.oltType, 
                matchSerialNumber: matchSerialNumber
            });
            stopLoading();

            if(response){
                if(!response.success){
                    handleError(response.messages.message);
                    return;
                }
                setOnus(response.responses.response);
            } else {
                handleError('error/no-connection-with-API');
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
                (isLoading ? 
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