import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { useError } from '../../../hooks/useError';


import Alert from '@mui/material/Alert';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../../../hooks/useAuth';

export function SignIn(){
    const navigate = useNavigate();
    const { error, errorMessage, severityStatus, handleError } = useError();
    const { user, setUser } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassord] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail((e.target.value));
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassord((e.target.value));
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {event.preventDefault();};

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axios.post('http://localhost:4000/login', {
            email: email,
            password: password
        })
        .then(response => {
            localStorage.setItem('Authorization', response.data.token);
            const jwtDecoded = jwtDecode(response.data.token);
            setUser(jwtDecoded);
            navigate('/');
        })
        .catch(err => {
            handleError(err.response.data.error);
        });
    }

    return(
        <form className='flex' onSubmit={handleLogin}>
            <FormControl>
                <InputLabel htmlFor="outlined-adornment-email">E-mail</InputLabel>
                <OutlinedInput
                    placeholder='Digite seu E-mail'
                    type='text'
                    onChange={handleEmailChange}
                    startAdornment={
                        <InputAdornment position="end">
                            <IconButton edge="start">
                                <MailOutlineIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                    label="E-mail"
                />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    placeholder='Digite sua senha'
                    type={showPassword ? 'text' : 'password'}
                    onChange={handlePasswordChange}
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
            <Button variant="contained" size="large" type="submit">
                Entrar
            </Button>
            {
                (error ?
                    <Alert severity={severityStatus} className="alert">{errorMessage}</Alert>
                :
                    <></>
                )
            }
        </form>
    )
}