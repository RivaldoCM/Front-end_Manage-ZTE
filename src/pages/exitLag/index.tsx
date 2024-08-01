import React, { useState } from 'react';
import { ModalOverlay, ModalContent, CloseButton, Button, Form, FormGroup, Label, Input, Title } from './style';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import { getTokenExitLag } from '../../services/apiManageONU/getTokenExitlag';
import { getExitLagUsers } from '../../services/apiExitLag/getUser';
import { sendToken } from '../../services/apiManageONU/sendTokenExitLag';
import { getToken } from '../../services/apiExitLag/getToken';
import { useResponse } from '../../hooks/useResponse';
import { createUser } from '../../services/apiExitLag/createUsers';


function CadastroModal({ show, handleClose }:any) {
    const { setFetchResponseMessage } = useResponse();
    if (!show) {
        return null;
    }

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

        console.log(form)

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

        /*
        const token = await getTokenExitLag();
        if (token) {
            if(token.success) {
                const response = await getExitLagUsers(token.responses.response);

                if(response.error){
                    if(response.error.response.data.error==='Unauthorized'){
                        const token = await getToken();
                        if(token){
                            sendToken(token);
                            getExitLagUsers(token);
                        } else {
                            setFetchResponseMessage('error/no-connection-with-API'); 
                        }
                    } else {
                        setFetchResponseMessage('error/no-connection-with-API');
                    }
                } else {

                }
            } else {
                
            }
        } else {

        }
        */
    }

    return (
        <ModalOverlay>
            <ModalContent>
                <CloseButton onClick={handleClose}> <HighlightOffRoundedIcon fontSize='small' /> </CloseButton>
                <Title>Cadastro</Title>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="nome">Nome:</Label>
                        <Input type="text" id="nome" name="name" required onChange={handleFormChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="email">Email:</Label>
                        <Input type="email" id="email" name="email" required  onChange={handleFormChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="confirmEmail">Confirme seu Email:</Label>
                        <Input type="email" id="confirmEmail" name="confirmEmail" required onChange={handleFormChange} onPaste={handlePaste}/>
                    </FormGroup>
                    <Button type="submit">Cadastrar</Button>
                </Form>
            </ModalContent>
        </ModalOverlay>
    );
}

export function Exitlag() {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <Button onClick={openModal}>Nova venda</Button>
            <CadastroModal show={showModal} handleClose={closeModal} />
        </>
    );
}
