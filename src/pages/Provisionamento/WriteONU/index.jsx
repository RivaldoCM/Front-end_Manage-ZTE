import React, { useState } from "react";
import axios from 'axios';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Typography from '@mui/material/Typography';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CircularProgress from '@mui/material/CircularProgress';

import { InputContainer } from "./style";

export function WriteONU({ city, setDataFromApi, dataFromApi, setSerialNumber, serialNumber, handleError, isLoading, startLoading, stopLoading, OltInfo }){

	const [dataOnu, setDataOnu] = useState();
	const [isDropDownOpen, setIsDropDownOpen] = useState(0);
	const [dropDownIndex, setDropDownIndex] = useState(0);
	const [pppoe, setPppoe] = useState('');
	const [contractNumber, setContractNumber] = useState('');

    const handleContractNumberChange = (e) => { setContractNumber(e.target.value); };
    const handlePppoeChange = (e) => { setPppoe(e.target.value); };

    const handleDropDownArrow = (e, index) => {
        e.preventDefault();
        setIsDropDownOpen(!isDropDownOpen);
        setDropDownIndex(index);
    }
    
    const handleSubmitWriteData = async (event) => {
        event.preventDefault();
        setSerialNumber(dataOnu[3]);  
        //ISSO EXISTE PARA COMPARAÇÃO NO LOADING ÚNICO DO BOTÃO PROVISIONAR
    
        const isNumeric = /^[0-9]+$/;
    
        if (isLoading){
            const err = 'warning/has-action-in-progress';
            handleError(err);
        }else if(contractNumber.length === 0 || pppoe.length === 0){
            handleError('info/required-input');
        }else if(!isNumeric.test(contractNumber)){
            handleError('info/non-expect-caracter-NAN');
        }else{
            startLoading();
            const oltData = OltInfo.find(option => option.label === city ? city : '');
            
            await axios.post('https://app.eterniaservicos.com.br/writeONU', {
                ip: oltData.ip,
                slot: dataOnu[0],
                pon: dataOnu[1],
                isPizzaBox: oltData.isPizzaBox,
                serialNumber: dataOnu[3],
                type: dataOnu[2],
                contract: contractNumber,
                pppoe: pppoe.toLowerCase()
            })
            .then(response => {
                stopLoading();
                handleError(response.data);
                setDataFromApi(response.data);
            })
            .catch(error => {
                stopLoading();
                handleError(error.code);
            });
        }
    }    

    return(
        <div className="ONU-content">
            {	
                (Array.isArray(dataFromApi) ?
                    dataFromApi.map((item, index) => (
                        <div key={index} className="onu-callback flex">
                            <div className="info-onu-controller flex">
                                <div className="add-onu flex">
                                    <ul className="flex">
                                        <li>Placa: {item[0]}</li>
                                        <li>Pon: {item[1]}</li>
                                        <li>Serial: {item[3]}</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="write-onu-controller flex">
                                <Accordion className="dropdown-box flex">
                                    <AccordionSummary
                                        className="dropdown-header"
                                        expandIcon={isDropDownOpen && index === dropDownIndex? <ExpandLessIcon/> : <ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        onClick={(e) => {handleDropDownArrow(e, index);}}
                                    >
                                        <Typography>Provisione aqui</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <form onSubmit={handleSubmitWriteData} className="flex">
                                            <InputContainer>
                                                <div className="text">
                                                    <p>PPPoE do cliente: </p>
                                                </div>
                                                <div className="content">
                                                    <TextField  variant="standard" onChange={handlePppoeChange}></TextField>
                                                </div>
                                            </InputContainer>
                                            <InputContainer>
                                                <div className="text">
                                                    <p>Número do contrato: </p>
                                                </div>
                                                <div className="content">
                                                    <TextField 
                                                        variant="standard" 
                                                        inputProps={{ inputMode: 'numeric' }}
                                                        onChange={handleContractNumberChange}>
                                                    </TextField>
                                                </div>
                                            </InputContainer>
                                            {
                                                (isLoading && item[3] === serialNumber ?
                                                    <CircularProgress className="MUI-CircularProgress" color="primary"/>
                                                :
                                                    <div className="flex">
                                                        <Button 
                                                            type="submit" 
                                                            variant="outlined" 
                                                            endIcon={<AddOutlinedIcon />}
                                                            onClick={() => {
                                                                setDataOnu([item[0], item[1], item[2], item[3]]);
                                                            }}
                                                        >
                                                            Provisionar
                                                        </Button>
                                                    </div>
                                                )
                                            }
                                        </form>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </div>
                    ))
                :
                    <></>
                )
            }
        </div>
    )
}