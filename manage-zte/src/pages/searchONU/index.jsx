import React from "react";

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const OltInfo = [
    {
        id: 1,
        ip: '172.18.2.38',
        label: 'BANCADA',
        isPizzaBox: true
    },
    {
        id: 3,
        ip: '172.18.2.30',
        label: 'PURILANDIA',
        isPizzaBox: true
    },
    {
        id: 4,
        ip: '172.18.2.24',
        label: 'CELINA',
        isPizzaBox: true
    },
    {
        id: 5,
        ip: '172.18.2.6',
        label: 'GUAÇUI',
        isPizzaBox: false
    },
  ];

export function SearchOnu() {
    return(
        <div>
            <div>
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Select"
                    defaultValue="BANCADA"
                >
                {OltInfo.map((option) => (
                    <MenuItem key={option.id} value={option.label}>
                        {option.label}
                    </MenuItem>
                ))}
                </TextField>
            </div>
        </div>
	);
}