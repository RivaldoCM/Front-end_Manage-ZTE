import axios from 'axios';
import React, { useState } from "react";

import { Form } from "../../../components/Form";
import { WriteONUProps } from "../../../interfaces/WriteONUProps";
import { isAlphaNumeric, isNumeric } from '../../../config/regex';
import { typeBridgeZte, typePppoeZte } from '../../../config/tipsOlts';

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

    const [dataOnu, setDataOnu] = useState<{ placa: number; pon: number; model: string; serial: string; ip?: string; }[]>([]);

	const [isDropDownOpen, setIsDropDownOpen] = useState(false);
	const [dropDownIndex, setDropDownIndex] = useState(0);
	const [pppoe, setPppoe] = useState('');
	const [cpf, setCpf] = useState('');

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => { setCpf(e.target.value); };
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
        setIsDropDownOpen(false);

        //ISSO EXISTE PARA COMPARAÇÃO NO LOADING ÚNICO DO BOTÃO PROVISIONAR
        props.setSerialNumber(dataOnu[0].serial);

        if(dataOnu[0].model == "parks"){
            if (props.isLoading){
                const err = 'warning/has-action-in-progress';
                props.handleError(err);
            }else if(pppoe.length === 0 || cpf.length === 0){
                props.handleError('info/required-input');
            }else if(!cpf.match(isNumeric)){
                props.handleError('warning/invalid-cpf-input');
            }else{
                props.startLoading();
                
                let dataOlt: any = [];
                props.OltInfo.map((subArray) => {
                    return subArray.map((option: any) => {
                        const verifyCity = option.name
                        if(props.city === 'TOMBOS'){
                            if(option.city_id === 22){
                                dataOlt.push(option.host) 
                            }
                        }else if(verifyCity === props.city){
                            const ip = option.host;
                            dataOlt.push(ip);
                        }
                    });
                });
                if(dataOlt.length > 1){
                    dataOlt[0] = dataOnu[0].ip;
                }
                
                await axios.post(`http://localhost:4000/writeONU`, {
                    ip: dataOlt[0],
                    slot: null,
                    pon: dataOnu[0].pon,
                    isPizzaBox: null,
                    serialNumber: dataOnu[0].serial,
                    type: 'parks',
                    contract: null,
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
        }else{
            if (props.isLoading){
                const err = 'warning/has-action-in-progress';
                props.handleError(err);
            }else if(typeBridgeZte.includes((dataOnu[0].model)) && cpf.length === 0 ||
            (typeBridgeZte.includes(dataOnu[0].model) && pppoe.length === 0)){
                props.handleError('info/required-input');
            }else if(!cpf.match(isNumeric)){
                props.handleError('info/non-expect-caracter-NAN');
            }else if(typePppoeZte.includes(dataOnu[0].model) && !wifiSSID.match(isAlphaNumeric)){
                props.handleError('info/wifi-ssid-did-not-match');
            }else if(typePppoeZte.includes(dataOnu[0].model) && !wifiPass.match(isAlphaNumeric)){
                props.handleError('info/wifi-password-did-not-match');
            }else if(typePppoeZte.includes(dataOnu[0].model) && wifiPass.length < 8){
                props.handleError('info/wrong-type-passoword');
            }else{
                props.startLoading();
                const oltData = props.OltInfo.find(option => option.name === props.city ? props.city : '')!;

                await axios.post(`http://localhost:4000/writeONU`, {
                    ip: [oltData.host],
                    slot: dataOnu[0].placa,
                    pon: dataOnu[0].pon,
                    isPizzaBox: oltData.isPizzaBox,
                    serialNumber: dataOnu[0].serial,
                    type: dataOnu[0].model,
                    contract: 1010,
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
                    console.log(error)
                    props.stopLoading();
                    props.handleError(error.code);
                });
            }
        }
    }

    return (
        <Container>
            {props.typeOnu === 'zte' ? (
                Array.isArray(props.dataFromApi) ? (
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
                                                    handleCpfChange={handleCpfChange}
                                                    isLoading={props.isLoading}
                                                    serialNumber={props.serialNumber}
                                                    item={item}
                                                    typeOnu={props.typeOnu}
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
                )
            ) : (
                Array.isArray(props.dataFromApi) ? (
                    props.dataFromApi.map((item) => {
                        if(Array.isArray(item)){
                            const [pon, signal, serial] = item;
                            return(
                                <div className="onu-callback flex">
                                <div className="info-onu-controller flex">
                                    <div className="add-onu flex">
                                        <ul className="flex">
                                            <li>Pon: {pon}</li>
                                            <li>Serial: {serial}</li>
                                            <li>Sinal: {signal}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="write-onu-controller flex">
                                    <Accordion className="dropdown-box flex">
                                        <AccordionSummary
                                            className="dropdown-header"
                                            expandIcon={isDropDownOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            onClick={() => setIsDropDownOpen(!isDropDownOpen)}
                                        >
                                            <Typography>Provisione aqui</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Form
                                                handleSubmitWriteData={handleSubmitWriteData}
                                                handlePppoeChange={handlePppoeChange}
                                                handleCpfChange={handleCpfChange}
                                                isLoading={props.isLoading}
                                                serialNumber={props.serialNumber}
                                                setDataOnu={setDataOnu}
                                                typeOnu={props.typeOnu}
                                                item={item}
                                                handlePppoePassChange={handlePppoePassChange}
                                                handleWifiSSIDChange={handleWifiSSIDChange}
                                                handleWifiPassChange={handleWifiPassChange}
                                            />
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            </div>
                            )
                        }
                    })
                ) : (
                    null
                )
            )}
        </Container>
    );
}