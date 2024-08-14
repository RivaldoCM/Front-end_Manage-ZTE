import React, { useState } from "react";

import { Alert, CircularProgress, FormControl, IconButton, Modal, TextField } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { getStoredExitLagToken } from "../../../services/apiManageONU/getTokenExitlag";

import { getToken } from "../../../services/apiExitLag/getToken.js";
import { sendToken } from "../../../services/apiManageONU/sendTokenExitLag.js";
import { useResponse } from "../../../hooks/useResponse.js";
import { isValidCpf, isValidEmail } from "../../../config/regex";
import { addClient } from "../../../services/apiExitLag/addClient.js";
import { useLoading } from "../../../hooks/useLoading.js";
import { useAuth } from "../../../hooks/useAuth.js";
import { addExitLagLog } from "../../../services/apiManageONU/addExitLagLog.js";
import { getPeopleId } from "../../../services/apiVoalle/getPeopleId.js";
import { AddClient } from "../style.js";

type ILocalAddUserProps = {
    open: boolean,
    selectedUser?: {
        id: number,
        department_id: number,
    } | null,
    handleClose: () => void,
    allClients: IExitLagUsers[]
}

export function AddUserExitLagModal(props: ILocalAddUserProps){
    const { user } = useAuth();
    const { isLoading, startLoading, stopLoading } = useLoading();
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let emailAlreadyExist = false;

        props.allClients.map((value: any) => {
            if(value.client.email === form.email.toLocaleLowerCase()){
                emailAlreadyExist = true;
            }
        });

        if(!form.cpf.match(isValidCpf)){
            setFetchResponseMessage('warning/invalid-cpf-input');
            return;
        }else if(form.email !== form.confirmEmail){
            setFetchResponseMessage('error/email-mismatch');
            return;
        }else if(!form.email.match(isValidEmail)){
            setFetchResponseMessage('error/Invalid-format-email');
            return;
        } else if(emailAlreadyExist){
            setFetchResponseMessage('error/already-exists-email');
        } else {
            startLoading();
            const token = await getStoredExitLagToken();
            if(token && token.success){
                const response = await addClient({token: token.responses.response, email: form.email, name: form.name});
                if(response && response.success){
                    setFetchResponseMessage('success/data-updated');
                    props.handleClose();
                    stopLoading();
                    const voalleClient = await getPeopleId(form.cpf);
                    if(voalleClient){
                        addExitLagLog({userId: user!.uid, name: voalleClient.name, email: form.email});
                    }
                    return;
                } else {
                    const token = await getToken();
                    if(token){
                        sendToken(token);
                        const resNewToken = await addClient({token: token, email: form.email, name: form.name});
                        if(resNewToken && resNewToken.success){
                            setFetchResponseMessage('success/data-updated');
                            props.handleClose();
                            stopLoading();
                            const voalleClient = await getPeopleId(form.cpf);
                            if(voalleClient){
                                addExitLagLog({userId: user!.uid, name: voalleClient.name, email: form.email});
                            }
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
                        stopLoading();
                        const voalleClient = await getPeopleId(form.cpf);
                        if(voalleClient){
                            addExitLagLog({userId: user!.uid, name: voalleClient.name, email: form.email});
                        }
                        return;
                    }
                } else {
                    setFetchResponseMessage('error/no-connection-with-API'); 
                }
            }
        }
    }

    return(
        <React.Fragment>
            <Modal
                open={props.open}
                onClose={props.handleClose}
            >
                <AddClient onSubmit={handleSubmit}>
                    <h3>Novo Cliente</h3>
                    <FormControl>
                        <TextField
                            required
                            fullWidth
                            label="Nome"
                            name="name"
                            onChange={handleFormChange}
                            sx={{ mt: 2, minWidth: '300px' }}
                        />
                        <TextField
                            required
                            fullWidth
                            label="CPF do titular do cadastro"
                            name="cpf"
                            onChange={handleFormChange}
                            sx={{ mt: 2}}
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
                            label="Confirme o E-mail"
                            name="confirmEmail"
                            onChange={handleFormChange}
                            onPaste={handlePaste}
                            sx={{ mt: 2 }}
                        />
                    </FormControl>
                    <div className="exitlag-alert">
                        <Alert severity="warning">
                            <p>Estes dados nao poderão ser atualizados posteriormente.</p>
                            <p>Certifique-se de que TODOS os dados estejam corretos.</p>
                        </Alert>
                    </div>
                    {
                        isLoading ?
                        <div className="flex">
                            <CircularProgress size={24} sx={{mt: 1}}/>
                        </div>
                        :
                        <div className="flex">
                            <IconButton color="success" type="submit">
                                <DoneIcon />
                            </IconButton>
                            <IconButton color="error" onClick={props.handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </div>
                    }
                </AddClient>
            </Modal>
        </React.Fragment>
    )
}