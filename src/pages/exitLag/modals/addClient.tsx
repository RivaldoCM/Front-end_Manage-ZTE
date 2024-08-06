import { useState } from "react";

import { FormControl, IconButton, Modal, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { getStoredExitLagToken } from "../../../services/apiManageONU/getTokenExitlag";

import { getToken } from "../../../services/apiExitLag/getToken.js";
import { sendToken } from "../../../services/apiManageONU/sendTokenExitLag.js";
import { useResponse } from "../../../hooks/useResponse.js";
import { NewUserWrapper } from "../../admin/users/style";
import { isValidCpf, isValidEmail } from "../../../config/regex";
import { addClient } from "../../../services/apiExitLag/addClient.js";

type ILocalAddUserProps = {
    open: boolean,
    selectedUser?: {
        id: number,
        department_id: number,
    } | null,
    handleClose: () => void
}

export function AddUserExitLagModal(props: ILocalAddUserProps){
    const { setFetchResponseMessage } = useResponse();

    const [form, setForm] = useState({
        name: '',
        cpf: '',
        email: '',
        confirmEmail: ''
    });

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handlePaste = (e: any) => {
        e.preventDefault();
        return false;
    }

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        if(!form.cpf.match(isValidCpf) ){
            setFetchResponseMessage('warning/invalid-cpf-input');
            return;
        }else if(form.email !== form.confirmEmail){
            setFetchResponseMessage('error/email-mismatch');
        }else if(!form.email.match(isValidEmail)){
            setFetchResponseMessage('error/Invalid-format-email');
        } else {
            const token = await getStoredExitLagToken();
            if(token && token.success){
                const response = await addClient({token: token.responses.response, email: form.email, name: form.name});
                if(response && response.success){
                    setFetchResponseMessage('success/data-updated');
                    props.handleClose();
                    return;
                } else {
                    const token = await getToken();
                    if(token){
                        sendToken(token);
                        const resNewToken = await addClient({token: token, email: form.email, name: form.name});
                        if(resNewToken && resNewToken.success){
                            setFetchResponseMessage('success/data-updated');
                            props.handleClose();
                            return;
                        }
                    } else {
                        setFetchResponseMessage('error/no-connection-with-API'); 
                    }
                }
            } else {
                const token = await getToken();
                if(token){
                    sendToken(token);
                    const response = await addClient({token: token, email: form.email, name: form.name});
                    if(response && response.success){
                        setFetchResponseMessage('success/data-updated');
                        props.handleClose();
                        return;
                    }
                } else {
                    setFetchResponseMessage('error/no-connection-with-API'); 
                }
            }
        }
    }

    return(
        <Modal
            open={props.open}
            onClose={props.handleClose}
        >
            <NewUserWrapper onSubmit={handleSubmit}>
                <h3>Novo Cliente</h3>
                <FormControl>
                    <TextField
                        required
                        fullWidth
                        label="Nome"
                        name="name"
                        onChange={handleFormChange}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        required
                        fullWidth
                        label="CPF"
                        name="cpf"
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
                    <TextField
                        required
                        fullWidth
                        label="Confirme seu E-mail"
                        name="confirmEmail"
                        onChange={handleFormChange}
                        onPaste={handlePaste}
                        sx={{ mt: 2 }}
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