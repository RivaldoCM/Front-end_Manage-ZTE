import axios from 'axios';
import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { IDecodedJWT } from '../../interfaces/IDecodedJWT';

import { Container } from './style';
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { signIn } from '../../services/apiManageONU/signIn';

export function Login() {
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassord] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail((e.target.value));
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassord((e.target.value));
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {event.preventDefault();};

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await signIn({email, password});

        localStorage.setItem('Authorization', response.data.token);
            const jwtDecoded: IDecodedJWT = jwtDecode(response.data.token);
            setUser(jwtDecoded);
            navigate('/auth_onu');
    }

    return (
        <Container className='flex'>
            <form className='flex' onSubmit={handleLogin}>
            <FormControl>
                <InputLabel htmlFor="outlined-adornment-email">E-mail</InputLabel>
                <OutlinedInput
                    placeholder='Digite seu E-mail'
                    type='text'
                    onChange={handleEmailChange}
                    startAdornment={
                        <InputAdornment position="start">
                            <MailOutlineIcon />
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
                        <InputAdornment position="start">
                                <LockOpenIcon />
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
        </form>
        </Container>
    )
}