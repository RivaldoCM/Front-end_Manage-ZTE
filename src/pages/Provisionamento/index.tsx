import React, { useState, useEffect } from "react";

import { SearchONU } from "./SearchONU";
import { WriteONU } from "./WriteONU";

import { getOlt } from "../../services/apiManageONU/getOlt";
import { useError } from "../../hooks/useError";
import { useLoading } from "../../hooks/useLoading";

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

type IDataFromApi = {
    placa: number,
    pon: number,
    model: string,
    serial: string
}

export function Provisionamento(){
    const { error, errorMessage, severityStatus, handleError } = useError();
    const { isLoading, startLoading, stopLoading } = useLoading();

    const [city, setCity] = useState('');
	const [dataFromApi, setDataFromApi] = useState<IDataFromApi[]>([]);
	const [serialNumber, setSerialNumber] = useState('');
    const [olt, setOlt] = useState<any>([]);
    const [type, setType] = useState('zte');
	const [value, setValue] = useState(0); //MUI-Core

    useEffect(() => {
        if(type === 'zte'){
            async function olts(){
                const oltData = await getOlt('zte');
                if(typeof oltData !== 'string'){
                    setOlt(oltData);
                    setCity('ESPERA-FELIZ');
                } else {
                    setOlt([]);
                    setCity('');
                    handleError('unable-load-data');
                }
            }
            olts();
        }else{
            async function olts(){
                const oltData = await getOlt('parks');
                if(typeof oltData !== 'string'){
                    setOlt(oltData);
                    setCity('SANTA-CLARA');
                } else {
                    setOlt([]);
                    setCity('');
                    handleError('unable-load-data');
                }
            }
            olts();
        }
    }, [type]);

    const handleTypeZte = () => {
        if(type === 'zte'){
            return;
        }
        setType('zte');
        setDataFromApi([]);
        setOlt([]);
        setCity('');
    }

    const handleTypeParks = () => {
        if(type === 'parks'){
            return;
        }
        setType('parks');
        setDataFromApi([]);
        setOlt([]);
        setCity('');
    }
    
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
								<Tab label="Provisiona ZTE" {...a11yProps(0)} onClick={handleTypeZte}/>
								<Tab label="Provisiona Parks" {...a11yProps(1)} onClick={handleTypeParks}/>
							</Tabs>
						</Box>
						<CustomTabPanel className="flex" value={value} index={0}>
                            <SearchONU 
                                type={type}
                                setCity={setCity}
                                city={city}
                                setDataFromApi={setDataFromApi}
                                serialNumber={serialNumber}
                                handleError={handleError}
                                isLoading={isLoading}
                                startLoading={startLoading}
                                stopLoading={stopLoading}
                                setSerialNumber={setSerialNumber}
                                typeOnu={type}
                                OltInfo={olt}
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
                                typeOnu={type}
                                OltInfo={olt}
                            />
						</CustomTabPanel>
                        <CustomTabPanel className="flex" value={value} index={1}>
                            <SearchONU
                                type={type}
                                setCity={setCity} 
                                city={city} 
                                setDataFromApi={setDataFromApi} 
                                serialNumber={serialNumber}
                                handleError={handleError}
                                isLoading={isLoading}
                                startLoading={startLoading}
                                stopLoading={stopLoading}
                                setSerialNumber={setSerialNumber}
                                typeOnu={type}
                                OltInfo={olt}
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
                                typeOnu={type}
                                OltInfo={olt}
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