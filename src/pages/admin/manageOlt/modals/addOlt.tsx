import React from 'react';
import Button from '@mui/material/Button';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import { AddOlt, DefaultStyledModal, FormModal, CloseButton, SubmitModal } from './style';
import { InputContainer } from '../../../../globalStyles';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

export default function AddOltModal(props: any) {

  return (
    <div>
        <IconButton onClick={props.handleOpen} title="Delete">
            <AddOutlinedIcon/>
        </IconButton>
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <DefaultStyledModal>
                <AddOlt>
                    <CloseButton className="flex">
                        <IconButton aria-label="close" onClick={props.handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </CloseButton>
                    <FormModal className='flex'>
                        <InputContainer>
                            <div className="text">
                                <p>Cidade: </p>
                            </div>
                            <TextField id="standard-basic" variant="standard" />
                        </InputContainer>
                        <InputContainer>
                            <div className="text">
                                <p>IP: </p>
                            </div>
                            <TextField id="standard-basic" variant="standard" />
                        </InputContainer>
                        <InputContainer>
                            <div className="text">
                                <p>Ponto de acesso: </p>
                            </div>
                            <TextField id="standard-basic" variant="standard" />
                        </InputContainer>
                        <InputContainer>
                            <div className="text">
                                <p>PizzaBox: </p>
                            </div>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="PizzaBox"
                                >
                                    <MenuItem value='Sim'>Sim</MenuItem>
                                    <MenuItem value='Não'>Não</MenuItem>
                                </Select>
                            </FormControl>
                        </InputContainer>
                    </FormModal>
                    <SubmitModal className="button flex">
                    <Button type='submit' onClick={props.handleClose} variant="contained">Adicionar OLT</Button>
                    </SubmitModal>
                </AddOlt>
            </DefaultStyledModal>
        </Modal>
    </div>
  );
}
