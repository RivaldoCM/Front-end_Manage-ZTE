import { useEffect, useState } from 'react';

import { getCities } from '../../../../services/apiManageONU/getCities';
import { addOlt } from '../../../../services/apiManageONU/addOlt';
import { useError } from '../../../../hooks/useError';

import { FormController, DefaultStyledModal, FormModal, CloseButton, SubmitModal } from '../../../../styles/modal';
import { InputContainer } from '../../../../styles/globalStyles';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { SelectChangeEvent } from '@mui/material/Select';
import { useLoading } from '../../../../hooks/useLoading';
import { CircularProgress } from '@mui/material';
import { IOltProps } from '../../../../interfaces/IOltProps';

export function AddOltModal(props: any) {
    const { error, errorMessage, severityStatus, handleError } = useError();
    const { isLoading, startLoading, stopLoading } = useLoading();

    const [cities, setCities] = useState<Array<any> | null>(null);
    const [form, setForm] = useState<IOltProps>({
        name: '',
		cityId: 1,
		host: '',
		type: 10,
		isPizzaBox: 1,
		voalleAccessPointId: 0
	});

    useEffect(() => {
        if(props.open){
            async function cities(){
                const cities = await getCities();
                setCities(cities);
            }
            cities();
        }
    }, [props.open]);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string | number | boolean>) => {
		setForm({
            ...form,
            [e.target.name]: e.target.value
        });
	}

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
        startLoading();

        const response = await addOlt(form);
        props.handleClose();
        stopLoading();
        if(!response.success){
			handleError(response.messages.message);
		}
		handleError(response.responses.status);
	}

  return (
    <>
        <IconButton onClick={props.handleOpen} title="Delete">
            <AddOutlinedIcon/>
        </IconButton>
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-add-OLT"
            aria-describedby="modal-to-handle-new-OLT's"
        >
            <DefaultStyledModal onSubmit={handleSubmit}>
                <FormController>
                    <CloseButton className="flex">
                        <IconButton aria-label="close" onClick={props.handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </CloseButton>
                    <FormModal className='flex'>
                        <InputContainer>
                            <div className="text">
                                <p>Nome da OLT: </p>
                            </div>
                            <div className="content">
                                <TextField
                                    required
                                    id="standard-basic"
                                    name="name"
                                    value={form.name}
                                    variant="standard"
                                    onChange={handleFormChange}
                                />
                            </div>
                        </InputContainer>
                        <InputContainer>
                            <div className="text">
                                <p>Cidade: </p>
                            </div>
                            <div className="content">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Cidades</InputLabel>
                                    <Select
                                    sx={{maxWidth: '205px'}}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="cityId"
                                        label="Cidades"
                                        value={form.cityId}
                                        onChange={handleFormChange}
                                    >
                                        {
                                            cities && cities.map((el: { id: number; name: string }, index: number) => {
                                                return(
                                                    <MenuItem key={index} value={el.id}>{el.name}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                        </InputContainer>
                        <InputContainer>
                            <div className="text">
                                <p>IP: </p>
                            </div>
                            <div className="content">
                                <TextField
                                    required
                                    id="standard-basic"
                                    name="host"
                                    value={form.host}
                                    variant="standard"
                                    onChange={handleFormChange}
                                />
                            </div>
                        </InputContainer>
                        <InputContainer>
                            <div className="text">
                                <p>Ponto de acesso: </p>
                            </div>
                            <div className="content">
                                <input 
                                    required
                                    type="number"
                                    name="voalleAccessPointId"
                                    value={form.voalleAccessPointId}
                                    onChange={handleFormChange}
                                />
                            </div>
                        </InputContainer>
                        <InputContainer>
                            <div className="text">
                                <p>PizzaBox: </p>
                            </div>
                            <div className="content">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="isPizzaBox"
                                        value={form.isPizzaBox}
                                        label="Status"
                                        onChange={handleFormChange}
                                    >
                                        <MenuItem value={1}>Sim</MenuItem>
                                        <MenuItem value={0}>Não</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </InputContainer>
                        <InputContainer>
                            <div className="text">
                                <p>Modelo: </p>
                            </div>
                            <div className="content">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Modelo da OLT</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="type"
                                        value={form.type}
                                        label="Modelo da OLT"
                                        onChange={handleFormChange}
                                    >
                                        <MenuItem value={10}>ZTE</MenuItem>
                                        <MenuItem value={20}>PARKS</MenuItem>
                                        <MenuItem value={30}>FIBERHOME</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </InputContainer>
                    </FormModal>
                    {
                        (isLoading ?
                            <div className="flex">
                                <CircularProgress className="MUI-CircularProgress" color="primary"/>
                            </div>
                            :
                            <SubmitModal className="button flex">
                                <Button type='submit' variant="contained">Criar OLT</Button>
                            </SubmitModal>
                        )
                    }
                </FormController>
            </DefaultStyledModal>
        </Modal>
        {
            (error ?
                <Alert severity={severityStatus} className="alert">{errorMessage}</Alert>
            :
                <></>
            )
        }
    </>
  );
}
