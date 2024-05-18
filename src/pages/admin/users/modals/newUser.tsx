import React, { useState } from "react";

import { useAuth } from "../../../../hooks/useAuth";
import { useResponse } from "../../../../hooks/useResponse";
import { signUp } from "../../../../services/apiManageONU/signUp";
import { isValidEmail } from "../../../../config/regex";



import { NewUserWrapper } from "../style";
import { SelectChangeEvent } from '@mui/material/Select';
import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Modal, OutlinedInput, Select, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export function NewUser(props: {open: boolean, handleClose: () => void}){
    const { user } = useAuth();
    const { setFetchResponseMessage } = useResponse();

    const [form, setForm] = useState({
        userName: '',
        email: '',
        accessLevel: 1,
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {event.preventDefault();};
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<number>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!form.email.match(isValidEmail)){
            setFetchResponseMessage('error/invalid-format-email');
        } else if(user!.rule <= form.accessLevel){
            setFetchResponseMessage('error/privilege-denied');
        } else {
            const response = await signUp({
                userName: form.userName,
                email: form.email,
                accessLevel: form.accessLevel,
                password: form.password
            });

            if(response){
                if(response.success){
                    props.handleClose();
                    setFetchResponseMessage(response.responses.status);
                } else {
                    setFetchResponseMessage(response.messages.message);
                }
            } else {
                setFetchResponseMessage('error/no-connection-with-API');
            }
        }
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
                    sx={{ mt: 2 }}
                />
                <FormControl fullWidth sx={{ mt: 2, mb:2 }}>
                    <InputLabel>Nível de Acesso</InputLabel>
                    <Select
                        label="Nível de Acesso"
                        name="accessLevel"
                        value={form.accessLevel}
                        onChange={handleFormChange}
                    >
                        <MenuItem value={1}>Call Center</MenuItem>
                        <MenuItem value={3}>Supervisor Call Center</MenuItem>
                        <MenuItem value={10}>Tecnicos</MenuItem>
                        <MenuItem value={14}>NOC</MenuItem>
                        <MenuItem value={16}>CGR</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth>
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
                    <IconButton color="success" type="submit">
                        <DoneIcon />
                    </IconButton>
                    <IconButton color="error" onClick={props.handleClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </NewUserWrapper>
        </Modal>
    )
}