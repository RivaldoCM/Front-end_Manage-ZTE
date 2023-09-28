import React, { useState } from "react";

import { SearchONU } from "./SearchONU";
import { WriteONU } from "./WriteONU";

import { useError } from "../../hooks/useError";
import { useLoading } from "../../hooks/useLoading";

import { OltInfoItem } from "../../interfaces/OltInfoItem";

import { Container } from './style';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';

interface TabPanelProps {
    className?: string
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
	const { className, children, value, index, ...other } = props;

	return (
		<div
            className={className}
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
			<Box sx={{ p: 3 }}>
				<Typography component='span'>{children}</Typography>
			</Box>
			)}
		</div>
	);
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
  
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const OltInfo: OltInfoItem[] = [
	{
		id: 0,
		ip: '172.18.2.38',
		label: 'OLT Bancada',
		isPizzaBox: true
	},
    {
        id: 1,
        ip: '172.18.2.2',
        label: 'Natividade',
        isPizzaBox: false
    },
    {
        id: 2,
        ip: '172.18.2.6',
        label: 'Guaçui',
        isPizzaBox: false
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
        isPizzaBox: false
    },
    {
        id: 5,
        ip: '172.18.2.18',
        label: 'Varre-sai',
        isPizzaBox: false
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
        isPizzaBox: true
    },
    {
        id: 8,
        ip: '172.18.2.30',
        label: 'Tombos',
        isPizzaBox: true
    },
    {
        id: 9,
        ip: '172.18.2.34',
        label: 'Pedra Menina',
        isPizzaBox: true
    },
];

export function Provisionamento(){

    const { error, errorMessage, severityStatus, handleError } = useError();
    const { isLoading, startLoading, stopLoading } = useLoading();

    const [city, setCity] = useState('Natividade');
	const [dataFromApi, setDataFromApi] = useState<any[]>([]);
	const [serialNumber, setSerialNumber] = useState('');

	const [value, setValue] = useState(0); //MUI-Core

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => { //MUI-Core
        setValue(newValue);
    };

    return(
        <Container>
            <div className="input-content">
				<div className="formContent">
					<Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }} className='flex'>
							<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
								<Tab label="Provisionamento" {...a11yProps(0)} />
								{/*<Tab label="Item Two" {...a11yProps(1)} /> ADICIONA NOVA ABA */ }
							</Tabs>
						</Box>
						<CustomTabPanel className="flex" value={value} index={0}>
                            <SearchONU 
                                setCity={setCity} 
                                city={city} 
                                setDataFromApi={setDataFromApi} 
                                serialNumber={serialNumber}
                                handleError={handleError}
                                isLoading={isLoading}
                                startLoading={startLoading}
                                stopLoading={stopLoading}
                                OltInfo={OltInfo}
                                setSerialNumber={setSerialNumber}
                            />
							<Divider variant="middle" />
							<WriteONU 
                                city={city}
                                dataFromApi={dataFromApi}
                                setDataFromApi={setDataFromApi}
                                setSerialNumber={setSerialNumber}
                                serialNumber={serialNumber}
                                handleError={handleError}
                                isLoading={isLoading}
                                startLoading={startLoading}
                                stopLoading={stopLoading}
                                OltInfo={OltInfo}
                            />
						</CustomTabPanel> 	
					</Box>
				</div>
				{
					(error ?
						<Alert severity={severityStatus} className="alert">{errorMessage}</Alert>
					:
						<></>
					)
				}
			</div>
        </Container>
    )
}