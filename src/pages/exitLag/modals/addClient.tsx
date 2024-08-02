import { FormControl, IconButton, Modal } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { useState } from "react";
import { getTokenExitLag } from "../../../services/apiManageONU/getTokenExitlag";
import { createUser } from "../../../services/apiExitLag/createUser";
import { getToken } from "../../../services/apiExitLag/getToken";
import { sendToken } from "../../../services/apiManageONU/sendTokenExitLag";
import { useResponse } from "../../../hooks/useResponse";

type ILocalAddUserProps = {
    open: boolean,
    selectedUser: {
        id: number,
        department_id: number,
    } | null,
    handleClose: () => void
}

export function addUserExitLagModal(props: ILocalAddUserProps){
    const { setFetchResponseMessage } = useResponse();

    const [form, setForm] = useState({
        name: '',
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

        if(form.email !== form.confirmEmail){
            console.log('diferente')
            return;
        } else {
            const token = await getTokenExitLag();
            if(token.success){
                const response = await createUser({token: token.responses.response, email: form.email, name: form.name});
                console.log(response)
                if(response.data.error === 'Unauthorized'){
                    const token = await getToken();
                    if(token){
                        sendToken(token);
                        await createUser({token: token, email: form.email, name: form.name})
                    } else {
                        setFetchResponseMessage('error/no-connection-with-API'); 
                    }
                } else {
                    console.log(response)
                }
            }
        }
    }

    return(
        <Modal
            open={props.open}
            onClose={props.handleClose}
        >
            <div onSubmit={handleSubmit}>
                <h3>Nova Senha</h3>
                <FormControl>

                </FormControl>
                <div className="flex">
                    <IconButton color="success" type="submit">
                        <DoneIcon />
                    </IconButton>
                    <IconButton color="error" onClick={props.handleClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </div>
        </Modal>
    )
}