import React, { useState } from "react";

import { Container } from './style';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Typography from '@mui/material/Typography';
import { useAuthOnu } from "../../../hooks/useAuthOnu";
import { ZTEForm } from "./Forms/zte";
import { PARKSForm } from "./Forms/parks";
import { FHForm } from "./Forms/fh";

export function WriteONU(){
    const { onus } = useAuthOnu();

	const [isDropDownOpen, setIsDropDownOpen] = useState(false);
	const [dropDownIndex, setDropDownIndex] = useState(0);

    const handleDropDownArrow = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
        e.preventDefault();
        setIsDropDownOpen(!isDropDownOpen);
        setDropDownIndex(index);
    }

    const handleShowOnuByType = () => {
        if(onus){
            return onus.map((element, index) => {
                switch(element.modelOlt){
                    case 'ZTE':
                        return(
                            <Container key={element.serialNumber}>
                                <div className="onu-callback flex">
                                    <div className="info-onu-controller flex">
                                        <div className="add-onu flex">
                                            <ul className="flex">
                                                <li>Placa: {element.slot}</li>
                                                <li>Pon: {element.pon}</li>
                                                <li>Serial: {element.serialNumber}</li>
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
                                                <ZTEForm onu={element}/>
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                </div>
                            </Container>
                        );
                    case 'PARKS':
                        return(
                            <Container key={element.serialNumber}>
                                <div className="onu-callback flex">
                                    <div className="info-onu-controller flex">
                                        <div className="add-onu flex">
                                            <ul className="flex">
                                                <li>Pon: {element.pon}</li>
                                                <li>Serial: {element.serialNumber}</li>
                                                <li>Sinal: {element.onuRx}</li>
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
                                                <PARKSForm onu={element} />
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                </div>
                            </Container>
                        );
                    case 'FIBERHOME':
                        return(
                            <Container key={element.serialNumber}>
                                <div className="onu-callback flex">
                                    <div className="info-onu-controller flex">
                                        <div className="add-onu flex">
                                            <ul className="flex">
                                                <li>Placa: {element.slot}</li>
                                                <li>Pon: {element.pon}</li>
                                                <li>Serial: {element.serialNumber}</li>
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
                                                <FHForm onu={element}/>
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                </div>
                            </Container>
                        );
                    default:
                    return(
                        <></>
                    );
                };
            });
        } else {
            return <></>;
        }
    }

    return (
        handleShowOnuByType()
    );
}