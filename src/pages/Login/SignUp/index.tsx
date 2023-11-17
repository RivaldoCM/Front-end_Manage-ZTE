import React from 'react';

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
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

export function SignUp() {

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {event.preventDefault();};

    return(
        <form className='flex'>
            <FormControl>
                <InputLabel htmlFor="outlined-adornment-user">Usuário</InputLabel>
                <OutlinedInput
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
                    placeholder='Digite seu E-mail'
                    type='text'
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
    )
}