import { useState } from 'react';
import { ModalOverlay, ModalContent, CloseButton, Button, Form, FormGroup, Label, Input, Title } from './style';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';

function CadastroModal({ show, handleClose }:any) {
    if (!show) {
        return null;
    }

    return (
        <ModalOverlay>
            <ModalContent>
                <CloseButton onClick={handleClose}> <HighlightOffRoundedIcon fontSize='small' /> </CloseButton>
                <Title>Cadastro</Title>
                <Form>
                    <FormGroup>
                        <Label htmlFor="nome">Nome:</Label>
                        <Input type="text" id="nome" name="nome" required />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="email">Email:</Label>
                        <Input type="email" id="email" name="email" required />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="confirmEmail">Confirme seu Email:</Label>
                        <Input type="email" id="confirmEmail" name="confirmEmail" required />
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
