import React, { useState } from "react";

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Container } from "./style";

const OltInfo = [
    {
        id: 1,
        ip: '172.18.2.2',
        label: 'Natividade',
        isPizzaBox: true
    },
    {
        id: 2,
        ip: '172.18.2.6',
        label: 'Guaçui',
        isPizzaBox: true
    },
    {
        id: 3,
        ip: '172.18.2.10',
        label: 'Celina',
        isPizzaBox: true
    },
    {
        id: 4,
        ip: '172.18.2.14',
        label: 'Espera Feliz',
        isPizzaBox: true
    },
    {
        id: 5,
        ip: '172.18.2.18',
        label: 'Varre-sai',
        isPizzaBox: true
    },
    {
        id: 6,
        ip: '172.18.2.22',
        label: 'Purilândia',
        isPizzaBox: true
    },
    {
        id: 7,
        ip: '172.18.2.26',
        label: 'Catuné',
        isPizzaBox: false
    },
    {
        id: 8,
        ip: '172.18.2.30',
        label: 'Tombos',
        isPizzaBox: false
    },
    {
        id: 9,
        ip: '172.18.2.34',
        label: 'Pedra Menina',
        isPizzaBox: false
    },
];

export function SearchOnu({ onInputChange }) {

    const [serial, setSerial] = useState();

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setSerial(newValue);

        // Chama a função fornecida como propriedade (onInputChange) e passa o novo valor do serial
        onInputChange(newValue);
    };

    return(
        <Container className="flex">
            <div className="option-container flex">
                <div className="text">
                    <p>Selecione a cidade: </p>
                </div>
                <div className="content">
                    <TextField
                        id='1'
                        select
                        label="Select"
                        defaultValue="Natividade"
                    >
                        {OltInfo.map((option) => (
                            <MenuItem key={option.id} value={option.label}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
            </div>
            <div className="option-container flex">
                <div className="text">
                    <p>Digite o serial da ONU: </p>
                </div>
                <div className="content">
                    <TextField 
                        id="standard-basic" 
                        label="Serial" 
                        variant="standard" 
                        type="text"
                        onChange={handleInputChange}
                    />
                </div>
            </div>

        </Container>
	);
}