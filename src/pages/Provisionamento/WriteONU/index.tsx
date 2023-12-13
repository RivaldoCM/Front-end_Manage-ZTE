import React, { useState } from "react";

import { Form } from "../../../components/Form";
import { WriteONUProps } from "../../../interfaces/WriteONUProps";

import { Container } from './style';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Typography from '@mui/material/Typography';
import { AuthOnu } from "../../../services/apiManageONU/authOnu";
import { IDataOnu } from "../../../interfaces/IAuthOnuProps";

export function WriteONU(props: WriteONUProps){



    //lifting up
    const [pppoePass, setPppoePass] = useState('');
	const [wifiSSID, setWifiSSID] = useState('');
	const [wifiPass, setWifiPass] = useState('');
    const [dataOnu, setDataOnu] = useState<IDataOnu[]>([]);
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
        console.log(dataOnu)
        AuthOnu({...props, pppoe, pppoePass,wifiPass, wifiSSID, cpf, dataOnu});
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