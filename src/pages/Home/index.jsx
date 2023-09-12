import React, { useState } from "react";
import axios from 'axios';

import { Container, InputContainer } from "./style";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { VillaOutlined } from "@mui/icons-material";

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
	const [hasInputValue, setHasInputValue] = useState(false);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

    const handleCityChange = (event) => {
        setCity(event.target.value); //Atualiza o valor no Front-end
	}

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setSerial(newValue);
		setHasInputValue(true);

		if (newValue.length === 0) {
			//ELIMINANDO ENVIO DE DADOS VAZIO AO BACKEND
			setHasInputValue(false);
		}
    };

	const handleSubmit = async (event) => {
		event.preventDefault();

		const oltData = OltInfo.find(option => option.label === city ? city : '');
		console.log(oltData.ip, serial)
		try{
			const response = await axios.get('https://app.eterniaservicos.com.br/searchONU?', {
				params: {
					ip: oltData.ip,
					serialNumber: serial,
				}
			});

			setDataOnu(response.data);
		} catch(err){
			console.log(err);
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
								{/*<Tab label="Item Two" {...a11yProps(1)} /> ADICINA VIDEO DO CE*/ }
							</Tabs>
						</Box>
						<CustomTabPanel value={value} index={0}>
							<form onSubmit={handleSubmit} className="flex">
								<InputContainer center={true}>
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
								</InputContainer>
								<InputContainer>
									<div className="text">
										<p>Digite o serial da ONU: </p>
									</div>
									<div className="content">
										<TextField 
											id="standard-basic" 
											variant="standard" 
											type="text"
											onChange={handleInputChange}
										/>
									</div>
								</InputContainer>
								{
									hasInputValue 
									? 
										<Button type="submit" variant="contained" endIcon={<SendIcon />}>
											Procurar ONU
										</Button>
									:
										<Button type="submit" disabled variant="contained" endIcon={<SendIcon />}>
											Procurar ONU
										</Button>
								}
							</form>
							<ul>
								{
									Array.isArray(dataOnu) ? (
										dataOnu.map((item, index) => (
											<div key={index} className="onu-callback flex">
												<div className="info-onu-controller flex">
													<div className="add-onu flex">
														<ul className="flex">
															<li>Placa: {item[0]}</li>
															<li>Pon: {item[1]}</li>
															<li>Serial: {item[2]}</li>
														</ul>
													</div>
												</div>
												<div className="write-onu-controller flex">
													<Accordion className="dropdown-box flex">
														<AccordionSummary 
															className="dropdown-header"
															expandIcon={<ExpandMoreIcon sx={{ color: 'white'}} />}
															aria-controls="panel1a-content"
															id="panel1a-header"
														>
															<Typography>Provisione aqui</Typography>
														</AccordionSummary>
														<AccordionDetails className="teste">
															<form>
																<InputContainer>
																	<div className="text">
																		<p>PPPoE do cliente: </p>
																	</div>
																	<div className="content">
																		<TextField  variant="standard">
		
																		</TextField>
																	</div>
																</InputContainer>
			
																<InputContainer>
																	<div className="text">
																		<p>Número do contrato: </p>
																	</div>
																	<div className="content">
																		<TextField  variant="standard">
		
																		</TextField>
																	</div>
																</InputContainer>
		
																<Button type="submit" variant="contained" endIcon={<SendIcon />}>
																	Provisionar
																</Button>
															</form>
														</AccordionDetails>
													</Accordion>
												</div>
											</div>
										))
									) : (
										<li>Lista vazia</li>
									)
								}
							</ul>
						</CustomTabPanel> 	
					</Box>
				</div>
			</div>
		</Container>
	);
}