import React, { useState } from "react";
import axios from 'axios';

import { WriteONUProps } from "../../../interfaces/WriteONUProps";

import { Form } from "../../../components/Form";

import { Container } from './style';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Typography from '@mui/material/Typography';

export function WriteONU(props: WriteONUProps){

    //lifting up
    const [pppoePass, setPppoePass] = useState('');
	const [wifiSSID, setWifiSSID] = useState('');
	const [wifiPass, setWifiPass] = useState('');

	const [dataOnu, setDataOnu] = useState([]);
	const [isDropDownOpen, setIsDropDownOpen] = useState(0);
	const [dropDownIndex, setDropDownIndex] = useState(0);
	const [pppoe, setPppoe] = useState('');
	const [contractNumber, setContractNumber] = useState('');

    const handleContractNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => { setContractNumber(e.target.value); };
    const handlePppoeChange = (e: React.ChangeEvent<HTMLInputElement>) => { setPppoe(e.target.value); };
    const handlePppoePassChange = (e: React.ChangeEvent<HTMLInputElement>) => { setPppoePass(e.target.value); }
    const handleWifiSSIDChange = (e: React.ChangeEvent<HTMLInputElement>) => { setWifiSSID(e.target.value); }
    const handleWifiPassChange = (e: React.ChangeEvent<HTMLInputElement>) => { setWifiPass(e.target.value); }

    const handleDropDownArrow = (e: React.ChangeEvent<HTMLInputElement>, index) => {
        e.preventDefault();
        setIsDropDownOpen(!isDropDownOpen);
        setDropDownIndex(index);
    }
    
    const handleSubmitWriteData = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        props.setSerialNumber(dataOnu[3]);
        //ISSO EXISTE PARA COMPARAÇÃO NO LOADING ÚNICO DO BOTÃO PROVISIONAR
    
        const typeMapping = {
            'F670L': 'F670L',
            'F6600': 'F6600',
            'F680': 'F680',
            'F601': 'F601',
            'F612': 'F612'
        };
        
        const isNumeric = /^[0-9]+$/;
        const isAlphaNumeric = /^[a-zA-Z0-9_]+$/;
        const typeBridge = ['F601', 'F612'];
        const typePppoe = ['F680', 'F6600', 'F670L'];
          
        for (const key in typeMapping) {
            if (dataOnu[2].includes(key)) {
              dataOnu[2] = typeMapping[key];
              break; // Para sair do loop após encontrar uma correspondência
            }
        }

        if (props.isLoading){
            const err = 'warning/has-action-in-progress';
            props.handleError(err);
        }else if(typeBridge.includes((dataOnu[2]) && contractNumber.length === 0) ||
        (typeBridge.includes(dataOnu[2]) && pppoe.length === 0)){
            props.handleError('info/required-input');
        }else if(!isNumeric.test(contractNumber)){
            props.handleError('info/non-expect-caracter-NAN');
        }else if(typePppoe.includes(dataOnu[2]) && wifiPass.length < 8){
            props.handleError('info/wrong-type-passoword');
        }else if(typePppoe.includes(dataOnu[2]) && !isAlphaNumeric.test(wifiPass)){
            props.handleError('info/wifi-did-not-match');
        }else{
            props.startLoading();
            const oltData = props.OltInfo.find(option => option.label === props.city ? props.city : '')!;

            await axios.post('https://app.eterniaservicos.com.br/writeONU', {
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
                props.stopLoading();
                props.handleError(response.data);
                props.setDataFromApi(response.data);

            })
            .catch(error => {
                props.stopLoading();
                props.handleError(error.code);
            });
        }
    }    

    return(
        
        <Container>
            {	
                Array.isArray(props.dataFromApi) ? (
                    props.dataFromApi.map((item, index) => (
                        <div key={index} className="onu-callback flex">
                            <div className="info-onu-controller flex">
                                <div className="add-onu flex">
                                    <ul className="flex">
                                        <li>Placa: {item.placa}</li>
                                        <li>Pon: {item[1]}</li>
                                        <li>Modelo: {item[2]}</li>
                                        <li>Serial: {item.serial}</li>
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
                                            isLoading={props.isLoading}
                                            item={item}
                                            serialNumber={props.serialNumber}
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
                ) : (
                    null 
                )
            }
        </Container>
    )
}