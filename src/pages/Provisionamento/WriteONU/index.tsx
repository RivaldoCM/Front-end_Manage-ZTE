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

export function WriteONU(){
    const { authOnu, onus } = useAuthOnu(); 

	const [isDropDownOpen, setIsDropDownOpen] = useState(false);
	const [dropDownIndex, setDropDownIndex] = useState(0);

    const handleDropDownArrow = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
        e.preventDefault();
        setIsDropDownOpen(!isDropDownOpen);
        setDropDownIndex(index);
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
                                                <li>Placa: {item.onu.slot}</li>
                                                <li>Pon: {item.onu.pon}</li>
                                                <li>Serial: {item.onu.serialNumber}</li>
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
                                                <ZTEForm onu={item.onu}/>
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
                    onus?.map((item, index) => {
                       return(
                            <Container>
                                <div key={index} className="onu-callback flex">
                                    <div className="info-onu-controller flex">
                                        <div className="add-onu flex">
                                            <ul className="flex">
                                                <li>Pon: {item.onu.pon}</li>
                                                <li>Serial: {item.onu.serialNumber}</li>
                                                <li>Sinal: {item.onu.rxPower}</li>
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