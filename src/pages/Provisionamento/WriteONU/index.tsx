import React, { useState } from "react";

import { Form } from "../../../components/Form";

import { Container } from './style';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Typography from '@mui/material/Typography';
import { AuthOnu } from "../../../services/apiManageONU/authOnu";
import { IDataOnu } from "../../../interfaces/IAuthOnuProps";
import { useAuthOnu } from "../../../hooks/useAuthOnu";
import { ZTEForm } from "./Forms/zte";

export function WriteONU(){
    const { authOnu, setAuthOnu, onus } = useAuthOnu(); 

    //lifting up
    const [pppoePass, setPppoePass] = useState('');
	const [wifiSSID, setWifiSSID] = useState('');
	const [wifiPass, setWifiPass] = useState('');
    const [dataOnu, setDataOnu] = useState<IDataOnu>();
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

        if (dataOnu){
            //ISSO EXISTE PARA COMPARAÇÃO NO LOADING ÚNICO DO BOTÃO PROVISIONAR
            //props.setSerialNumber(dataOnu.serial);
            //AuthOnu({...props, pppoe, pppoePass, wifiPass, wifiSSID, cpf, dataOnu});
        }
    }

    const handleShowOnuByType = (type: string) => {
        switch(type){
            case 'zte':
                return(
                    onus?.map((item, index) => {
                        return(
                            <Container>
                                <div key={index} className="onu-callback flex">
                                    <div className="info-onu-controller flex">
                                        <div className="add-onu flex">
                                            <ul className="flex">
                                                <li>Placa: {item.slot}</li>
                                                <li>Pon: {item.pon}</li>
                                                <li>Serial: {item.serialNumber}</li>
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
                                                <ZTEForm model={item.model}/>
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                </div>
                            </Container>
                        )
                    })
                );
            case 'parks':
                return(
                    onus?.map((onuItem, index) => {
                       return(
                            <Container>
                                <div key={index} className="onu-callback flex">
                                    <div className="info-onu-controller flex">
                                        <div className="add-onu flex">
                                            <ul className="flex">
                                                <li>Pon: {onuItem.pon}</li>
                                                <li>Serial: {onuItem.serial}</li>
                                                <li>Sinal: {onuItem.rxPower}</li>
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

                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                </div>
                            </Container>
                       ) 
                    })
                );
            default:
                return <></>;
        }
    }

    return (
        handleShowOnuByType(authOnu.oltType)
    );
}