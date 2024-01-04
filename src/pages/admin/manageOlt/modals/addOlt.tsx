import { useEffect, useState } from 'react';
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
import { getCities } from '../../../../services/apiManageONU/getCities';
import { addOlt } from '../../../../services/apiManageONU/addOlt';

export function AddOltModal(props: any) {
    const [cities, setCities] = useState<Array<any> | null>(null);
    const [form, setForm] = useState({
		cityId: '',
		host: '',
		type: 10,
		pizzaBox: true,
		voalleAccessPointId: ''
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

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
		setForm({
            ...form,
            [e.target.name]: e.target.value
        });
	}

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
        const res = await addOlt(form);
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
                        </InputContainer>
                        <InputContainer>
                            <div className="text">
                                <p>IP: </p>
                            </div>
                            <TextField
                                required
                                id="standard-basic"
                                name="host"
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
                                required
                                id="standard-basic"
                                name="voalleAccessPointId"
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
                                    name="pizzaBox"
                                    value={form.pizzaBox}
                                    label="Status"
                                    onChange={handleFormChange}
                                >
                                    <MenuItem value={true}>Sim</MenuItem>
                                    <MenuItem value={false}>Não</MenuItem>
                                </Select>
                            </FormControl>
                        </InputContainer>
                        <InputContainer>
                            <div className="text">
                                <p>Modelo: </p>
                            </div>
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
                        </InputContainer>
                    </FormModal>
                    <SubmitModal className="button flex">
                        <Button type='submit' variant="contained">Editar OLT</Button>
                    </SubmitModal>
                </AddOlt>
            </DefaultStyledModal>
        </Modal>
    </>
  );
}
