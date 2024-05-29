import React, { useEffect, useState } from "react";

import { useAuthOnu } from "../../../hooks/useAuthOnu";
import { useError } from "../../../hooks/useError";
import { useLoading } from "../../../hooks/useLoading";
import { getOlt } from "../../../services/apiManageONU/getOlt";
import { verifyIfOnuExists } from "../../../services/apiManageONU/verifyIfOnuExists";
import { isAlphaNumeric } from "../../../config/regex";
import { handleOltByCity } from "../../../config/renderOltByCity";

import { Form } from './style';
import { InputContainer } from "../../../styles/globalStyles";
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert } from "@mui/material";

export function SearchONU() {
    const { authOnu, setAuthOnu, setViewOnlyOlt, viewOnlyOlt, setOnus } = useAuthOnu();
    const { isLoading, startLoading, stopLoading } = useLoading();
    const { error, errorMessage, severityStatus, handleError } = useError();

    const [matchSerialNumber, setMatchSerialNumber] = useState('');

    useEffect(() => {
        async function oltZte(){
            const oltData = await getOlt('all');
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
    }, []);

    useEffect(() => {
        //LIMPANDO OS DADOS CASO TROQUE DE CIDADE
        setOnus([]);
        setAuthOnu({
            ...authOnu,
            ip: [],
            oltId: [],
            cpf: '',
            pppoeUser: '',
            pppoePassword: '',
            wifiName: '',
            wifiPassword: '',
            typeOnu: '',
            modelOnu: 'F601',
            modelOlt: [],
            isPizzaBox: [],
            voalleAccessPointId: []
        });
        stopLoading();
    }, [authOnu.city]);

    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setAuthOnu({
            ...authOnu,
            city: e.target.value
        });
    };
    
    const handleMatchSerialNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setMatchSerialNumber(e.target.value); 
    };

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
        } else if(!isAlphaNumeric.test(matchSerialNumber)){
            handleError('info/non-expect-caracter-not-alphaNumeric');
            stopLoading();
        } else {
            const olt = viewOnlyOlt!.filter((olt) => olt.name.includes(authOnu.city));
            let ips: string[] = [];
            let modelOlt: number[] = [];

            olt.map((data) => {
                ips.push(data.host);
                modelOlt.push(data.type);
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
                modelOlt: modelOlt, 
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
                        {handleOltByCity(viewOnlyOlt)}
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
                        <Button 
                            disabled 
                            variant="outlined" 
                            endIcon={<SearchIcon />} 
                            sx={{ 
                                color: 'var(--text-color)', 
                                borderColor: 'var(--text-color)' 
                            }}
                        >
                            Procurar ONU
                        </Button>
                    :
                        <Button 
                            type="submit" 
                            variant="outlined" 
                            endIcon={<SearchIcon />} 
                            sx={{ 
                                color: 'var(--text-color)', 
                                borderColor: 'var(--text-color)' 
                            }}
                        >
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
