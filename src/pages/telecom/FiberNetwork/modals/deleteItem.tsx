import * as React from 'react';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';

import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

export default function DeleteItemModal({ open, handleClose }: any) {
    return (
        <React.Fragment>
            <Modal open={open} onClose={handleClose}>
                <ModalDialog variant="outlined" role="alertdialog">
                    <DialogTitle>
                        <WarningRoundedIcon />
                        Confirmação
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        Você tem certeza que quer deletar todos os itens selecionados?
                    </DialogContent>
                    <DialogActions>
                        <Button variant="solid" color="danger">
                            Deletar
                        </Button>
                        <Button variant="plain" color="neutral" onClick={handleClose}>
                            Cancelar
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}