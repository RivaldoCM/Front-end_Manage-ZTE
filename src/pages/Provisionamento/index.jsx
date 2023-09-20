import React, { useState } from "react";

import { useLoading } from "../../hooks/useLoading";
import { useError } from "../../hooks/useError";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';

import { SearchONU } from "./SearchONU";
import { WriteONU } from "./WriteONU";

import { Container } from "./style";

function CustomTabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
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

function a11yProps(index) {
	return {
	  id: `simple-tab-${index}`,
	  'aria-controls': `simple-tabpanel-${index}`,
	};
}

const OltInfo = [
	{
		id: 0,
		ip: '172.18.2.38',
		label: 'OLT Bancada',
		isPizzaBox: 1
	},
    {
        id: 1,
        ip: '172.18.2.2',
        label: 'Natividade',
        isPizzaBox: 0
    },
    {
        id: 2,
        ip: '172.18.2.6',
        label: 'Guaçui',
        isPizzaBox: 0
    },
    {
        id: 3,
        ip: '172.18.2.10',
        label: 'Celina',
        isPizzaBox: 1
    },
    {
        id: 4,
        ip: '172.18.2.14',
        label: 'Espera Feliz',
        isPizzaBox: 0
    },
    {
        id: 5,
        ip: '172.18.2.18',
        label: 'Varre-sai',
        isPizzaBox: 0
    },
    {
        id: 6,
        ip: '172.18.2.22',
        label: 'Purilândia',
        isPizzaBox: 1
    },
    {
        id: 7,
        ip: '172.18.2.26',
        label: 'Catuné',
        isPizzaBox: 1
    },
    {
        id: 8,
        ip: '172.18.2.30',
        label: 'Tombos',
        isPizzaBox: 1
    },
    {
        id: 9,
        ip: '172.18.2.34',
        label: 'Pedra Menina',
        isPizzaBox: 1
    },
];

export function Provisionamento() {

	const [city, setCity] = useState('Natividade');
	const [dataFromApi, setDataFromApi] = useState([]);
	const [serialNumber, setSerialNumber] = useState(null);

	const [value, setValue] = useState(0);

	const { isLoading, startLoading, stopLoading } = useLoading();
	const { error, errorMessage, severityStatus, handleError } = useError();

	const handleChange = (event, newValue) => {	setValue(newValue); }; //MUI-Core

	return (
		<Container className="flex">
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
							/>
							<Divider variant="middle" />
							<WriteONU 
								setCity={setCity} 
								city={city} 
								setDataFromApi={setDataFromApi} 
								serialNumber={serialNumber}
								handleError={handleError}
								isLoading={isLoading}
								startLoading={startLoading}
								stopLoading={stopLoading}
								dataFromApi={dataFromApi}
								setSerialNumber={setSerialNumber}
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
	);
}