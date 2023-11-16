import React, { useState, useEffect } from "react";
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

    const [dataOnu, setDataOnu] = useState<{ placa: string; pon: string; model: string; serial: string; }[]>([]);
	const [isDropDownOpen, setIsDropDownOpen] = useState(false);
	const [dropDownIndex, setDropDownIndex] = useState(0);
	const [pppoe, setPppoe] = useState('');
	const [contractNumber, setContractNumber] = useState('');

    const handleContractNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => { setContractNumber(e.target.value); };
    const handlePppoeChange = (e: React.ChangeEvent<HTMLInputElement>) => { setPppoe(e.target.value); };
    const handlePppoePassChange = (e: React.ChangeEvent<HTMLInputElement>) => { setPppoePass(e.target.value); }
    const handleWifiSSIDChange = (e: React.ChangeEvent<HTMLInputElement>) => { setWifiSSID(e.target.value); }
    const handleWifiPassChange = (e: React.ChangeEvent<HTMLInputElement>) => { setWifiPass(e.target.value); }

    const handleDropDownArrow = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
        e.preventDefault();
        setIsDropDownOpen(!isDropDownOpen);
        setDropDownIndex(index);
    }
    
    const handleSubmitWriteData = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const dataOnuByName = [];
        setIsDropDownOpen(false);

        for (const objeto of dataOnu) {
            const { placa, pon, model, serial } = objeto;
            dataOnuByName.push(placa, pon, model, serial);
        }

        props.setSerialNumber(dataOnuByName[3]);
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
            if (dataOnuByName[2].includes(key)) {
                dataOnuByName[2] = typeMapping[key as keyof typeof typeMapping];
                break; // Para sair do loop após encontrar uma correspondência
            }
        }

        if (props.isLoading){
            const err = 'warning/has-action-in-progress';
            props.handleError(err);
        }else if(typeBridge.includes((dataOnuByName[2])) && contractNumber.length === 0 ||
        (typeBridge.includes(dataOnuByName[2]) && pppoe.length === 0)){
            props.handleError('info/required-input');
        }else if(!isNumeric.test(contractNumber)){
            props.handleError('info/non-expect-caracter-NAN');
        }else if(typePppoe.includes(dataOnuByName[2]) && !isAlphaNumeric.test(wifiSSID)){
            props.handleError('info/wifi-ssid-did-not-match');
        }else if(typePppoe.includes(dataOnuByName[2]) && !isAlphaNumeric.test(wifiPass)){
            props.handleError('info/wifi-password-did-not-match');
        }else if(typePppoe.includes(dataOnuByName[2]) && wifiPass.length < 8){
            props.handleError('info/wrong-type-passoword');
        }else{
            props.startLoading();
            const oltData = props.OltInfo.find(option => option.label === props.city ? props.city : '')!;

            await axios.post('https://app.eterniaservicos.com.br/writeONU', {
                ip: oltData.ip,
                slot: dataOnuByName[0],
                pon: dataOnuByName[1],
                isPizzaBox: oltData.isPizzaBox,
                serialNumber: dataOnuByName[3],
                type: dataOnuByName[2],
                contract: contractNumber,
                pppoeUser: pppoe.toLowerCase(),
                pppPass: pppoePass || null,
                wifiSSID: wifiSSID || null,
                wifiPass: wifiPass || null
            })
            .then(response => {
                props.stopLoading();
                props.handleError(response.data);
                props.setDataFromApi([]);
            })
            .catch(error => {
                props.stopLoading();
                props.handleError(error.code);
            });
        }
    }

    return (
        <Container>
            {Array.isArray(props.dataFromApi) ? (
                props.dataFromApi.map((item, index) => {
                    if (Array.isArray(item) && item.length === 4) {
                        const [placa, pon, _model, serial] = item;

                        return (
                            <div key={index} className="onu-callback flex">
                                <div className="info-onu-controller flex">
                                    <div className="add-onu flex">
                                        <ul className="flex">
                                            <li>Placa: {placa}</li>
                                            <li>Pon: {pon}</li>
                                            <li>Serial: {serial}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="write-onu-controller flex">
                                    <Accordion className="dropdown-box flex">
                                        <AccordionSummary
                                        className="dropdown-header"
                                        expandIcon={isDropDownOpen && index === dropDownIndex ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        onClick={(e) => {
                                            handleDropDownArrow(e, index);
                                        }}
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
                        );
                    } else {
                        // Lida com o caso em que o item não corresponde ao esperado
                        return null;
                    }
                })
            ) : (
                null
            )}
        </Container>
    );
}