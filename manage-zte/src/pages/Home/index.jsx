import React, { useState } from "react";

import { SearchOnu } from "../searchONU";
import { Container } from "./style";

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';

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

	const [value, setValue] = React.useState(0);
	const [searchResult, setSearchResult] = useState("");

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleInputChange = (newInputValue) => {
		// Faça algo com o novo valor digitado, por exemplo, definir o resultado na state do componente pai
		setSearchResult(`Resultado da pesquisa para ${newInputValue}`);
	};

	return (
		<Container>
			<form>
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
						<SearchOnu onInputChange={handleInputChange}/>
						<div>{searchResult}</div>
					</CustomTabPanel> 	

				</Box>
				</div>
				<div className="formSubmit flex">
					<Button variant="contained" endIcon={<SendIcon />}>
						Procurar ONU
					</Button>
				</div>
			</form>
		</Container>
	);
}