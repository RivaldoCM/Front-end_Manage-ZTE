import React, { useEffect, useState } from 'react';

import { getCities } from '../../../../services/apiManageONU/getCities';
import { useError } from '../../../../hooks/useError';

import { AddOlt, DefaultStyledModal, FormModal, CloseButton, SubmitModal } from './style';
import { InputContainer } from '../../../../globalStyles';

import Modal from '@mui/material/Modal';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import { SelectChangeEvent } from '@mui/material/Select';

export function KeepMountedOltModal(props: any) {
    const { error, errorMessage, severityStatus, handleError } = useError();
	const [cities, setCities] = useState<Array<any> | null>(null);

	const [id, setId] = useState<number>(0);
	const [form, setForm] = useState({
		name: '',
		cityId: 1, 
		host: '',
		type: '',
		pizzaBox: '',
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

	if (typeof props.oltDataSelected === 'object' && id !== props.oltDataSelected['id']) {
		if ('id' in props.oltDataSelected && props.oltDataSelected['id'] !== id) {
			setId(props.oltDataSelected['id']);

			if(props.oltDataSelected['isPizzaBox']){
				setForm(() => ({
					...form,
					name: props.oltDataSelected['name'],
					host: props.oltDataSelected['host'],
					type: props.oltDataSelected['type'],
					pizzaBox: 'Sim',
					voalleAccessPointId: props.oltDataSelected['voalleAccessPointId'],
				}));
			}else{
				setForm(() => ({
					...form,
					name: props.oltDataSelected['name'],
					host: props.oltDataSelected['host'],
					type: props.oltDataSelected['type'],
					pizzaBox: 'Não',
					voalleAccessPointId: props.oltDataSelected['voalleAccessPointId'],
				}));
			}
		}
	}

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
			<IconButton onClick={props.handleOpen}>
				<EditOutlinedIcon />
			</IconButton>
			<Modal
				keepMounted
				open={props.open}
				onClose={props.handleClose}
				aria-labelledby="keep-mounted-modal-title"
				aria-describedby="keep-mounted-modal-description"
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
                                <p>Nome da OLT: </p>
                            </div>
                            <TextField
                                required
                                id="standard-basic"
                                name="name"
                                value={form.name}
                                variant="standard"
                                onChange={handleFormChange}
                            />
                        </InputContainer>
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
			{
                (error ?
                    <Alert severity={severityStatus} className="alert">{errorMessage}</Alert>
                :
                    <></>
                )
            }
		</div>
	);
}