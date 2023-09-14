import React, { useState } from "react";
import axios from 'axios';

import { useLoading } from "../../hooks/useLoading";
import { useError } from "../../hooks/useError";

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
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import Alert from '@mui/material/Alert';

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
	const [matchSerialNumber, setMatchSerialNumber] = useState('');
    const [city, setCity] = useState('Natividade');
	const [pppoe, setPppoe] = useState('');
	const [contractNumber, setContractNumber] = useState('');
	const [dataOnu, setDataOnu] = useState();
	const [dataFromApi, setDataFromApi] = useState([]);
	const [serialNumber, setSerialNumber] = useState(null);

	const { isLoading, startLoading, stopLoading } = useLoading();
	const { error, errorMessage, handleError } = useError();

	const handleChange = (event, newValue) => {	setValue(newValue); }; //MUI-Core
    const handleCityChange = (event) => { setCity(event.target.value); };
	const handlePppoeChange = (e) => { setPppoe(e.target.value); };
	const handleContractNumberChange = (e) => {	setContractNumber(e.target.value); };
    const handleInputChange = (e) => { setMatchSerialNumber(e.target.value); };

	const handleSubmit = async (event) => {
		event.preventDefault();
		if(isLoading){
			const err = 'loading/has-action-in-progress';
			handleError(err);
		
		}else{
			startLoading();
			const oltData = OltInfo.find(option => option.label === city ? city : '');
	
			try{
				const response = await axios.get('https://app.eterniaservicos.com.br/searchONU?', {
					params: {
						ip: oltData.ip,
						serialNumber: matchSerialNumber,
					}
				});
				stopLoading();
				if(typeof(response.data) === 'string'){
					handleError('api/ONU-not-found');
				}
				setDataFromApi(response.data);
			} catch(err){
				console.log(err);
			}
		}
	}

	const handleSubmitWriteData = async (event) => {
		event.preventDefault();

		if (isLoading){
			const err = 'loading/has-action-in-progress';
			handleError(err);
		}else{
			startLoading();
			setSerialNumber(dataOnu[2]);
			const setDataOnu = OltInfo.find(option => option.label === city ? city : '');

	
			/*try{
				const response = await axios.get('https://app.eterniaservicos.com.br/writeONU?', {
					params: {
						ip: oltData.ip,
						slot: dataOnu[0],
						ponsetDataOnu dataOnu[1],
						setDataOnu: oltData.isPizzaBox,
						serialNumber: dataOnu[2],
						setDataOnu: contractNumber,
						pppoe: pppoe
					}
				});
			stopLoading();
			} catch(err) {
				//TRATAR ERROS DE CONEXÃO
			}*/
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
								{/*<Tab label="Item Two" {...a11yProps(1)} /> ADICIONA NOVA ABA */ }
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
									(isLoading && serialNumber === null ? 
										<CircularProgress className="MUI-CircularProgress" color="primary"/>
									:
										(matchSerialNumber.length !== 0 ?
											<Button type="submit" variant="contained" endIcon={<SearchIcon />}>
												Procurar ONU
											</Button>
										:
											<Button type="submit" disabled variant="contained" endIcon={<SearchIcon />}>
												Procurar ONU
											</Button>
										)
									)
								}
							</form>
							{	
								Array.isArray(dataFromApi) ?
								dataFromApi.map((item, index) => (
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
													<form onSubmit={handleSubmitWriteData}>
														<InputContainer>
															<div className="text">
																<p>PPPoE do cliente: </p>
															</div>
															<div className="content">
																<TextField  variant="standard" onChange={handlePppoeChange}></TextField>
															</div>
														</InputContainer>
														<InputContainer>
															<div className="text">
																<p>Número do contrato: </p>
															</div>
															<div className="content">
																<TextField variant="standard" onChange={handleContractNumberChange}></TextField>
															</div>
														</InputContainer>
														{
															(isLoading && item[2] == serialNumber ?
																<CircularProgress className="MUI-CircularProgress" color="primary"/>
															:
																<Button 
																	type="submit" 
																	variant="contained" 
																	endIcon={<SendIcon />}
																	onClick={() => {
																		setDataOnu([item[0], item[1], item[2]]);
																	}}
																>
																	Provisionar
																</Button>
															)
														}
													</form>
												</AccordionDetails>
											</Accordion>
										</div>
									</div>
								))
								:
								<></>
							}
						</CustomTabPanel> 	
					</Box>
				</div>
				{
					(error ?
						<Alert severity="warning" className="alert">{errorMessage}</Alert>
					:
						<></>
					)
				}
			</div>
		</Container>
	);
}