import React from 'react';
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

import { Container } from '../../users/modals/style';
import { InputContainer } from '../../../../globalStyles';

export function KeepMountedOltModal(props: any) {
    const { error, errorMessage, severityStatus, handleError } = useError();

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
		<>
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
				<Container className='flex' onSubmit={handleSubmit}>
                    <div className="close-icon flex">
						<IconButton aria-label="close" onClick={props.handleClose}>
							<CloseIcon />
						</IconButton>
					</div>
                    <div className='content flex'>
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
								<p>Usuário: </p>
							</div>
                            <TextField id="standard-basic" variant="standard" />
                            <div className="text">
								<p>Senha: </p>
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
                    </div>
                    <div className="button flex">
						<Button type='submit' onClick={props.handleClose} variant="contained">Atualizar dados da OLT</Button>
					</div>
				</Container>
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