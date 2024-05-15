import { FormControl, IconButton, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import { NewUserWrapper } from "../style";
import React, { useState } from "react";

import { SelectChangeEvent } from '@mui/material/Select';

import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

import { isValidEmail } from "../../../../config/regex";

import { useResponse } from "../../../../hooks/useResponse";
import { updateUser } from "../../../../services/apiManageONU/updateUser";
import { useAuth } from "../../../../hooks/useAuth";

export function EditUser(props: any){
    const { user } = useAuth();
    const { setFetchResponseMessage } = useResponse();

    const [form, setForm] = useState({
        id: props.selectedUser.id,
        userName: props.selectedUser.name,
        email: props.selectedUser.email,
        accessLevel: props.selectedUser.department_id,
        status: props.selectedUser.status
    });

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!form.email.match(isValidEmail)){
            setFetchResponseMessage('error/invalid-format-email');
        } else if(user!.uid <= form.accessLevel){
            setFetchResponseMessage('error/privilege-denied');
        } else {

            const response = await updateUser({
                id: form.id,
                userName: form.userName,
                email: form.email,
                accessLevel: form.accessLevel,
                status: form.status
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
                <h3>EDITAR USUÁRIO</h3>
                <TextField
                    required
                    fullWidth
                    label="Nome"
                    name="userName"
                    value={form.userName}
                    onChange={handleFormChange}
                    sx={{ mt: 2 }}
                />
                <TextField
                    required
                    fullWidth
                    label="E-mail"
                    name="email"
                    value={form.email}
                    onChange={handleFormChange}
                    sx={{ mt: 2 }}
                />
                <FormControl fullWidth sx={{ mt: 2 }}>
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
                            <MenuItem value={17}>Administrador</MenuItem>
                            <MenuItem disabled value={2}>Consultoria</MenuItem>
                            <MenuItem disabled value={4}>Faturamento</MenuItem>
                            <MenuItem disabled value={5}>Supervisor Faturamento</MenuItem>
                            <MenuItem disabled value={6}>Comercial</MenuItem>
                            <MenuItem disabled value={7}>Supervisor Comercial</MenuItem>
                            <MenuItem disabled value={8}>Loja</MenuItem>
                            <MenuItem disabled value={9}>Supervisor Loja</MenuItem>
                            <MenuItem disabled value={11}>Cobrança</MenuItem>
                            <MenuItem disabled value={12}>Supervisor Cobrança</MenuItem>
                            <MenuItem disabled value={13}>Retenção</MenuItem>
                        </Select>
                    </FormControl>
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                        label="Status"
                        name="status"
                        value={form.status}
                        onChange={handleFormChange}
                    >
                        <MenuItem value="normal">Ativo</MenuItem>
                        <MenuItem value="Desativado">Desativado</MenuItem>
                    </Select>
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