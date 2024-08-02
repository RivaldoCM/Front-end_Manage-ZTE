import { useState } from "react";

import { FormControl, IconButton, InputLabel, MenuItem, Modal, Select, SelectChangeEvent } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

import { getTokenExitLag } from "../../../services/apiManageONU/getTokenExitlag";
import { getToken } from "../../../services/apiExitLag/getToken";
import { sendToken } from "../../../services/apiManageONU/sendTokenExitLag";
import { useResponse } from "../../../hooks/useResponse";

import { NewUserWrapper } from "../../admin/users/style";
import { editClient } from "../../../services/apiExitLag/editClient";

type ILocalAddUserProps = {
    open: boolean,
    selectedUser: {
        email: string,
        status: string,
    },
    handleClose: () => void
}

export function AddUserExitLagModal(props: ILocalAddUserProps){
    const { setFetchResponseMessage } = useResponse();

    const [form, setForm] = useState({
        status: '',
    });

    const handleFormChange = (e: SelectChangeEvent<string>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();

        const token = await getTokenExitLag();
        if(token.success){
            const response = await editClient({token: token.responses.response, email: props.selectedUser.email, status: ''});
            if(response.data.error === 'Unauthorized'){
                const token = await getToken();
                if(token){
                    sendToken(token);
                    await editClient({token: token, email: props.selectedUser.email, status: ''})
                } else {
                    setFetchResponseMessage('error/no-connection-with-API'); 
                }
            } else {
                console.log(response)
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
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Nível de Acesso</InputLabel>
                        <Select
                            label="Status"
                            name="status"
                            value={form.status}
                            onChange={handleFormChange}
                        >
                            <MenuItem value='Active'>Ativo</MenuItem>
                            <MenuItem value='Inactive'>Inativo</MenuItem>
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