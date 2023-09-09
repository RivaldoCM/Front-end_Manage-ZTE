import React, { useState } from "react";
import axios from 'axios';

import { Container, SearchONU } from "./style";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const OltInfo = [
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
        isPizzaBox: false
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

export function Home() {

	const [value, setValue] = useState(0);
	const [serial, setSerial] = useState();
    const [city, setCity] = useState('Natividade');
	const [dataOnu, setDataOnu] = useState([]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

    const handleCityChange = (event) => {
        setCity(event.target.value); //Atualiza o valor no Front-end
	}

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setSerial(newValue);
    };

	const handleSubmit = async (event) => {
		event.preventDefault();

        const ip = OltInfo.find(option => option.label === city ? city : '');
		console.log(ip.ip, serial)
		try{
			const response = await axios.get('http://localhost:4000/searchONU?', {
				params: {
					ip: ip.ip,
					serialNumber: serial,
				}
			})
			console.log('Resposta do servidor:', response.data);
			setDataOnu(response.data);
		} catch(err){
			console.log(err)
		}
	}

	return (
		<Container>
			<div className="input-content">
				<div className="formHeader flex">Provisionar ONU ZTE</div>
				<div className="formContent">
					<Box sx={{ width: '100%' }}>
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }} className='flex'>
							<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
								<Tab label="Nova instalação" {...a11yProps(0)} />
								<Tab label="Item Two" {...a11yProps(1)} />
							</Tabs>
						</Box>
						<CustomTabPanel value={value} index={0}>
							<form onSubmit={handleSubmit}>
								<SearchONU className="flex">
									<div className="option-container flex">
										<div className="text">
											<p>Selecione a cidade: </p>
										</div>
										<div className="content">
											<TextField
												id='1'
												select
												label="Cidades"
												value={city}
												onChange={handleCityChange}
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
									<Button type="submit" variant="contained" endIcon={<SendIcon />}>
										Procurar ONU
									</Button>
								</SearchONU>
							</form>
							<ul>
								{dataOnu.map((item, index) => (
									<div key={index} className="flex onu-callback">
										<div className="flex info-onu-controller">
											<h3>ONU {index + 1}:</h3>
											<div className="flex add-onu">
													<ul className="flex">
														<li>Placa: {item[0]}</li>
														<li>Pon: {item[1]}</li>
														<li>Serial: {item[2]}</li>
													</ul>
											</div>
										</div>
										<div className="flex write-onu-controller">
											<button className="write-onu">
												Provisionar
											</button>
										</div>
									</div>
								))}
							</ul>
						</CustomTabPanel> 	
					</Box>
				</div>
			</div>
		</Container>
	);
}