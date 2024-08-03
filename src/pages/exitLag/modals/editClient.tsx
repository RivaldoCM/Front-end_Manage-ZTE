import { useState } from "react";

import { FormControl, IconButton, InputLabel, MenuItem, Modal, Select, SelectChangeEvent } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

import { getToken } from "../../../services/apiExitLag/getToken";
import { sendToken } from "../../../services/apiManageONU/sendTokenExitLag";
import { useResponse } from "../../../hooks/useResponse";

import { NewUserWrapper } from "../../admin/users/style";
import { editClient } from "../../../services/apiExitLag/editClient";
import { getStoredExitLagToken } from "../../../services/apiManageONU/getTokenExitlag";

type ILocalAddUserProps = {
    open: boolean,
    selectedClient: {
        client: {
            email: string,
            status: string,
        },
        active: number
    },
    handleClose: () => void
}

export function EditClientExitLagModal(props: ILocalAddUserProps){
    const { setFetchResponseMessage } = useResponse();

    const [form, setForm] = useState({
        status: props.selectedClient.active === 1 ? 'Active' : 'Inactive',
    });

    const handleFormChange = (e: SelectChangeEvent<string>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        const token = await getStoredExitLagToken();
        if(token && token.success){
            const response = await editClient({token: token.responses.response, email: props.selectedClient.client.email, status: form.status});
            if(response.data.error === 'Unauthorized'){
                const token = await getToken();
                if(token){
                    sendToken(token);
                    await editClient({token: token, email: props.selectedClient.client.email, status: form.status})
                } else {
                    setFetchResponseMessage('error/no-connection-with-API'); 
                }
            } else {
                setFetchResponseMessage('error/no-connection-with-API'); 
            }
        } else {
            const token = await getToken();
            if(token){
                sendToken(token);
                await editClient({token: token, email: props.selectedClient.client.email, status: form.status})
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
                <h3>Editar Cliente</h3>
                <FormControl fullWidth sx={{ mt: 3, mb: 2, width: '200px' }}>
                    <InputLabel>Status</InputLabel>
                        <Select
                            label="Status"
                            name="status"
                            value={form.status}
                            onChange={handleFormChange}
                        >
                            <MenuItem value="Active">Ativo</MenuItem>
                            <MenuItem value="Inactive">Inativo</MenuItem>
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