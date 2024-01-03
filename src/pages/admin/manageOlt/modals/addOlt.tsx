import { useState } from 'react';
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
import { SelectChangeEvent } from '@mui/material/Select';

export default function AddOltModal(props: any) {

    const [form, setForm] = useState({
		name: '',
		host: '',
		type: '',
		pizzaBox: '',
		voalleAccessPointId: ''
	});

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
		setForm({
            ...form,
            [e.target.name]: e.target.value
        });
	}

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

	}

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
            <DefaultStyledModal onSubmit={handleSubmit}>
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
                            <TextField 
                                id="standard-basic"
                                name='name'
                                value={form.name}
                                variant="standard" 
                                onChange={handleFormChange}
                            />
                        </InputContainer>
                        <InputContainer>
                            <div className="text">
                                <p>IP: </p>
                            </div>
                            <TextField 
                                id="standard-basic"
                                name='host'
                                value={form.host}
                                variant="standard"
                                onChange={handleFormChange}
                            />
                        </InputContainer>
                        <InputContainer>
                            <div className="text">
                                <p>Ponto de acesso: </p>
                            </div>
                            <TextField 
                                id="standard-basic"
                                name='voalleAccessPointId'
                                value={form.voalleAccessPointId}
                                variant="standard"
                                onChange={handleFormChange}
                            />
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
                                    value={form.pizzaBox}
                                    label="PizzaBox"
                                    onChange={handleFormChange}
                                >
                                    <MenuItem value='Sim'>Sim</MenuItem>
                                    <MenuItem value='Não'>Não</MenuItem>
                                </Select>
                            </FormControl>
                        </InputContainer>
                        <InputContainer>
                            <div className="text">
                                <p>Modelo: </p>
                            </div>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    name='type'
                                    value={form.type}
                                    label="PizzaBox"
                                    onChange={handleFormChange}
                                >
                                    <MenuItem value='10'>ZTE</MenuItem>
                                    <MenuItem value='20'>PARKS</MenuItem>
                                    <MenuItem value='30'>FIBERHOME</MenuItem>
                                </Select>
                            </FormControl>
                        </InputContainer>
                    </FormModal>
                    <SubmitModal className="button flex">
                        <Button type='submit' onClick={props.handleClose} variant="contained">Editar OLT</Button>
                    </SubmitModal>
                </AddOlt>
            </DefaultStyledModal>
        </Modal>
    </div>
  );
}
