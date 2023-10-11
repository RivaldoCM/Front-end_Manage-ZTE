import React from 'react';

import { Container } from './style';

import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

interface TabPanelProps {
    className?: string;
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

export function Login() {

    const [value, setValue] = React.useState(0);
    const [showPassword, setShowPassword] = React.useState(false);
    
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {setValue(newValue);};
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {event.preventDefault();};
  
    return (
        <Container className='flex'>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Login" {...a11yProps(0)} />
                    <Tab label="Registrar" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <form className='flex'>
                    <FormControl>
                        <InputLabel htmlFor="outlined-adornment-email">E-mail</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email"
                            placeholder='Digite seu E-mail'
                            type='text'
                            startAdornment={
                                <InputAdornment position="end">
                                    <IconButton edge="start">
                                        <MailOutlineIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <p>@acesse.net.br</p>
                                </InputAdornment>
                            }
                            label="E-mail"
                        />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            placeholder='Digite sua senha'
                            type={showPassword ? 'text' : 'password'}
                            startAdornment={
                                <InputAdornment position="end">
                                    <IconButton edge="start">
                                        <LockOpenIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <Button variant="contained" size="large">
                        Entrar
                    </Button>
                </form>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <form className='flex'>
                    <FormControl>
                        <InputLabel htmlFor="outlined-adornment-user">Usuário</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-user"
                            placeholder='Digite seu nome'
                            startAdornment={
                                <InputAdornment position="end">
                                    <IconButton edge="start">
                                        <PersonOutlinedIcon />
                                    </IconButton>
                                </InputAdornment>
                            }   
                            label="Usuário"
                        />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="outlined-adornment-password">E-mail</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            placeholder='Digite seu E-mail'
                            type='text'
                            startAdornment={
                                <InputAdornment position="end">
                                    <IconButton edge="start">
                                        <MailOutlineIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <div>@acesse.net.br</div>
                                </InputAdornment>
                            }
                            label="E-mail"
                        />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            placeholder='Digite sua senha'
                            type={showPassword ? 'text' : 'password'}
                            startAdornment={
                                <InputAdornment position="end">
                                    <IconButton edge="start">
                                        <LockOpenIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <Button variant="contained" size="large">
                        Registrar
                    </Button>
                </form>
            </CustomTabPanel>
        </Container>
    )
}