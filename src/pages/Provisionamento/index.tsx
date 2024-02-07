import React, { useState } from "react";

import { useAuthOnu } from "../../hooks/useAuthOnu";
import { SearchONU } from "./SearchONU";
import { WriteONU } from "./WriteONU";

import { Container } from './style';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
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

export function Provisionamento(){
    const { authOnu, setAuthOnu, setOnus } = useAuthOnu();

	const [value, setValue] = useState(0); //MUI-Core

    const handleTypeZte = () => {
        if(authOnu.oltType === 'zte'){
            return;
        }
        setAuthOnu({
            ...authOnu,
            oltType: 'zte'
        })
        setOnus(undefined);
    }

    const handleTypeParks = () => {
        if(authOnu.oltType === 'parks'){
            return;
        }
        setAuthOnu({
            ...authOnu,
            oltType: 'parks'
        })
        setOnus(undefined);
    }

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => { 
        //MUI-Core
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
                            <SearchONU />
							<Divider variant="middle" />
							<WriteONU />
						</CustomTabPanel>
                        <CustomTabPanel className="flex" value={value} index={1}>
                            <SearchONU />
							<Divider variant="middle" />
							<WriteONU />
						</CustomTabPanel>
					</Box>
				</div>
			</div>
        </Container>
    )
}