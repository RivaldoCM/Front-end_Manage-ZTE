import React, { useState } from "react";
import axios from 'axios';

import { Form } from "../../../components/Form";
import { Container } from './style';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Typography from '@mui/material/Typography';


export function WriteONU({ 
    city,
    setDataFromApi, 
    dataFromApi, 
    setSerialNumber, 
    serialNumber, 
    handleError, 
    isLoading, 
    startLoading, 
    stopLoading, 
    OltInfo }){

    const [pppoePass, setPppoePass] = useState('');
	const [wifiSSID, setWifiSSID] = useState('');
	const [wifiPass, setWifiPass] = useState('');

	const [dataOnu, setDataOnu] = useState();
	const [isDropDownOpen, setIsDropDownOpen] = useState(0);
	const [dropDownIndex, setDropDownIndex] = useState(0);
	const [pppoe, setPppoe] = useState('');
	const [contractNumber, setContractNumber] = useState('');

    const handleContractNumberChange = (e) => { setContractNumber(e.target.value); };
    const handlePppoeChange = (e) => { setPppoe(e.target.value); };
    const handlePppoePassChange = (e) => { setPppoePass(e.target.value); }
    const handleWifiSSIDChange = (e) => { setWifiSSID(e.target.value); }
    const handleWifiPassChange = (e) => { setWifiPass(e.target.value); }

    const handleDropDownArrow = (e, index) => {
        e.preventDefault();
        setIsDropDownOpen(!isDropDownOpen);
        setDropDownIndex(index);
    }
    
    const handleSubmitWriteData = async (event) => {
        event.preventDefault();
        setSerialNumber(dataOnu[3]);  
        //ISSO EXISTE PARA COMPARAÇÃO NO LOADING ÚNICO DO BOTÃO PROVISIONAR
    
        console.log()
        const isNumeric = /^[0-9]+$/;
    
        if (isLoading){
            const err = 'warning/has-action-in-progress';
            handleError(err);
        }else if(contractNumber.length === 0 || pppoe.length === 0){
            handleError('info/required-input');
        }else if(wifiPass.length < 8){
            handleError('info/wrong-type-passowrd');
        }else if(!isNumeric.test(contractNumber)){
            handleError('info/non-expect-caracter-NAN');
        }else{
            startLoading();
            const oltData = OltInfo.find(option => option.label === city ? city : '');
            
            if(dataOnu[2].includes('F670L')){
                dataOnu[2] = 'F670L';
            }else if(dataOnu[2].includes('F6600')){
                dataOnu[2] = 'F6600';
            }else if(dataOnu[2].includes('F680')){
                dataOnu[2] = 'F680';
            }

            console.log(pppoePass, pppoe,wifiPass, wifiSSID)


            await axios.post('http://localhost:4000/writeONU', {
                ip: oltData.ip,
                slot: dataOnu[0],
                pon: dataOnu[1],
                isPizzaBox: oltData.isPizzaBox,
                serialNumber: dataOnu[3],
                type: dataOnu[2],
                contract: contractNumber,
                pppoeUser: pppoe.toLowerCase(),
                pppPass: pppoePass || null,
                wifiSSID: wifiSSID || null,
                wifiPass: wifiPass || null
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
        <Container>
            {	
                (Array.isArray(dataFromApi) ?
                    dataFromApi.map((item, index) => (
                        <div key={index} className="onu-callback flex">
                            <div className="info-onu-controller flex">
                                <div className="add-onu flex">
                                    <ul className="flex">
                                        <li>Placa: {item[0]}</li>
                                        <li>Pon: {item[1]}</li>
                                        <li>Modelo: {item[2]}</li>
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
                                        <Form 
                                            handleSubmitWriteData={handleSubmitWriteData}
                                            handlePppoeChange={handlePppoeChange}
                                            handleContractNumberChange={handleContractNumberChange}
                                            isLoading={isLoading}
                                            item={item}
                                            serialNumber={serialNumber}
                                            setDataOnu={setDataOnu}
                                            handlePppoePassChange={handlePppoePassChange}
                                            handleWifiSSIDChange={handleWifiSSIDChange}
                                            handleWifiPassChange={handleWifiPassChange}
                                        />
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        </div>
                    ))
                :
                    <></>
                )
            }
        </Container>
    )
}