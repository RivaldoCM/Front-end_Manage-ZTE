import axios from 'axios';
import React, { useState } from 'react';

import { useError } from '../../../hooks/useError';

import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

export function SignUp() {

    const { error, errorMessage, severityStatus, handleError } = useError();

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setUserName((e.target.value));
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail((e.target.value));
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword((e.target.value));
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {event.preventDefault();};

    const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await axios.post('http://localhost:4000/newUser', {
            username: userName,
            email: email,
            password: password
        })
        .then(response => {
            console.log(response.data.response)
            if(response.data.response === null){
                console.log(response.data)
               handleError(response.data.messages.message) 
            }else{
                handleError(response.data.response.status);
            }
        });
    }

    return(
        <form className='flex' onSubmit={handleCreateUser}>
            <FormControl>
                <InputLabel htmlFor="outlined-adornment-user">Usuário</InputLabel>
                <OutlinedInput
                    required
                    placeholder='Digite seu nome'
                    onChange={handleUserNameChange}
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
                <InputLabel htmlFor="outlined-adornment-password" required>E-mail</InputLabel>
                <OutlinedInput
                    required
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
                <InputLabel htmlFor="outlined-adornment-password" required>Password</InputLabel>
                <OutlinedInput
                    required
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
            <Button type='submit' variant="contained" size="large">
                Criar Conta
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