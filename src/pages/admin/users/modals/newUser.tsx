import { FormControl, IconButton, InputAdornment, InputLabel, Modal, OutlinedInput, TextField } from "@mui/material";
import { NewUserWrapper } from "../style";
import React, { useState } from "react";

import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOpenIcon from '@mui/icons-material/LockOpen';

export function NewUser(props: any){
    const [form, setForm] = useState({
        userName: '',
        email: '',
        password: ''
    });

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {event.preventDefault();};
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


    }

    return(
        <Modal
            open={props.open}
            onClose={props.handleClose}
        >
            <NewUserWrapper onSubmit={handleSubmit}>
                <h3>CRIAR USUÁRIO</h3>
                <TextField
                    required
                    fullWidth
                    label="Nome"
                    name="userName"
                    onChange={handleFormChange}
                    sx={{ mt: 2 }}
                />
                <TextField
                    required
                    fullWidth
                    label="E-mail"
                    name="email"
                    onChange={handleFormChange}
                    sx={{ mt: 2, mb:2 }}
                />
                <FormControl>
                <InputLabel htmlFor="outlined-adornment-password" required>Senha</InputLabel>
                    <OutlinedInput
                        label="Senha"
                        name='password'
                        type={showPassword ? 'text' : 'password'}
                        onChange={handleFormChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <div className="flex">
                    <IconButton color="error" onClick={props.handleClose}>
                        <CloseIcon />
                    </IconButton>
                    <IconButton color="success" type="submit">
                        <DoneIcon />
                    </IconButton>
                </div>
            </NewUserWrapper>
        </Modal>
    )
}