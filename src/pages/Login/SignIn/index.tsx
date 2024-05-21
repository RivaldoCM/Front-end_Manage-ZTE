import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

import { useAuth } from '../../../hooks/useAuth';
import { useResponse } from '../../../hooks/useResponse';
import { signIn } from '../../../services/apiManageONU/signIn';
import { IDecodedJWT } from '../../../interfaces/IDecodedJWT';

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

export function SignIn(){
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const {response, setFetchResponseMessage, severityStatus, responseMassage } = useResponse();

    const [email, setEmail] = useState('');
    const [password, setPassord] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail((e.target.value));
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassord((e.target.value));
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
                setFetchResponseMessage(response.messages.message);
            }
        } else {
            setFetchResponseMessage('error/no-connection-with-API');
        }
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
                response ? 
                    <Alert severity={severityStatus} className="alert">{responseMassage}</Alert>
                : <></>
            }
        </form>
    )
}