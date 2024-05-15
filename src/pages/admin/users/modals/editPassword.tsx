import { FormControl, IconButton, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import { NewUserWrapper } from "../style";
import React, { useState } from "react";

import { SelectChangeEvent } from '@mui/material/Select';

import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

import { useResponse } from "../../../../hooks/useResponse";
import { updateUser } from "../../../../services/apiManageONU/updateUser";
import { useAuth } from "../../../../hooks/useAuth";
import { updatePassword } from "../../../../services/apiManageONU/updatePassword";

export function EditPassword(props: any){
    const { user } = useAuth();
    const { setFetchResponseMessage } = useResponse();

    const [form, setForm] = useState({
        id: props.selectedUser.id,
        accessLevel: props.selectedUser.department_id,
        password: ''
    });

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(user!.uid < form.accessLevel){
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
                <h3>EDITAR SENHA</h3>
                <TextField
                    required
                    fullWidth
                    label="Senha"
                    name="password"
                    value={form.password}
                    onChange={handleFormChange}
                    sx={{ mt: 2 }}
                />
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