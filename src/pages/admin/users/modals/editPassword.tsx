import React, { useState } from "react";

import { useResponse } from "../../../../hooks/useResponse";

import { useAuth } from "../../../../hooks/useAuth";
import { updatePassword } from "../../../../services/apiManageONU/updatePassword";

import { NewUserWrapper } from "../style";
import { FormControl, IconButton, InputAdornment, InputLabel, Modal, OutlinedInput, } from "@mui/material";
import { SelectChangeEvent } from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

type IEditUser = {
    open: boolean,
    selectedUser: {
        id: number,
        department_id: number,
    } | null,
    handleClose: () => void
}

export function EditPassword(props: IEditUser){
    const { user } = useAuth();
    const { setFetchResponseMessage } = useResponse();

    const [form, setForm] = useState({
        id: props.selectedUser!.id,
        accessLevel: props.selectedUser!.department_id,
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {event.preventDefault();};
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(user!.rule <= props.selectedUser!.department_id && user?.rule !== 17 && user!.rule <= form.accessLevel){
            setFetchResponseMessage('error/privilege-denied');
        } else {
            const response = await updatePassword({
                id: form.id,
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
                <h3>Nova Senha</h3>
                <FormControl>
                    <InputLabel required>Senha</InputLabel>
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