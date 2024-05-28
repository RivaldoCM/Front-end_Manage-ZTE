import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import { IDecodedJWT } from '../../interfaces/IDecodedJWT';
import { signIn } from '../../services/apiManageONU/signIn';

import { Container } from './style';
import { Alert, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useResponse } from '../../hooks/useResponse';

export function Login() {
    const { setUser } = useAuth();
    const {response, setFetchResponseMessage, severityStatus, responseMassage } = useResponse();
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
        if(response){
            if(response.success){
                localStorage.setItem('Authorization', response.responses.response);
                const jwtDecoded: IDecodedJWT = jwtDecode(response.responses.response);
                setUser(jwtDecoded);
                navigate('/auth_onu');
            } else {
                setFetchResponseMessage(response.messages.message)
            }
        } else {

        }
    }

    return (
        <Container className='flex'>
            <form className='flex' onSubmit={handleLogin}>
                <FormControl>
                    <InputLabel htmlFor="outlined-adornment-email" style={{ color: 'var(--highlight-color)' }}>E-mail</InputLabel>
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
                        style={{ color: 'var(--highlight-color)' }}
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="outlined-adornment-password" style={{ color: 'var(--highlight-color)' }}>Password</InputLabel>
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
                        style={{ color: 'var(--highlight-color)' }}
                    />
                </FormControl>
                <Button variant="contained" size="large" type="submit" style={{ backgroundColor: 'var(--highlight-color)', color: 'var(--primary-color)' }}>
                    Entrar
                </Button>
            </form>
            {
                response ? 
                    <Alert severity={severityStatus} className="alert" style={{ backgroundColor: 'var(--secondary-color)', color: 'var(--highlight-color)' }}>
                        {responseMassage}
                    </Alert>
                : <></>
            }
        </Container>
    )
}
