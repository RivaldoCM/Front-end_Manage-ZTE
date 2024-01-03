import React, { useState } from 'react';
import axios from 'axios';

import { useError } from '../../../../hooks/useError';

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

import { AddOlt, DefaultStyledModal, FormModal, CloseButton, SubmitModal } from './style';

import { InputContainer } from '../../../../globalStyles';

export function KeepMountedOltModal(props: any) {
    const { error, errorMessage, severityStatus, handleError } = useError();

	const [id, setId] = useState<number>(0);
	const [form, setForm] = useState({
		name: '',
		host: '',
		type: '',
		pizzaBox: '',
		voalleAccessPointId: ''
	});
	
	if (typeof props.oltDataSelected === 'object' && id !== props.oltDataSelected['id']) {
		if ('id' in props.oltDataSelected && props.oltDataSelected['id'] !== id) {
			setId(props.oltDataSelected['id']);
			setForm(() => ({
				name: props.oltDataSelected['name'],
				host: props.oltDataSelected['host'],
				type: props.oltDataSelected['type'],
				pizzaBox: props.oltDataSelected['pizzaBox'],
				voalleAccessPointId: props.oltDataSelected['voalleAccessPointId'],
			}));
		}
	}


	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({
            ...form,
            [e.target.name]: e.target.value
        });
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await axios({
			method: 'patch',
			url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/getUsers`,
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
			},
			data:{

			}
		}).then((response) => {
			handleError(response.data);
		});
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
									name='accessPoint'
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
										name='pizzaBox'
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