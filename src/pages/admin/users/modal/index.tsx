import React, { useState } from 'react';
import axios from 'axios';

import { useError } from '../../../../hooks/useError';


import Modal from '@mui/material/Modal';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Container } from './style';
import { InputContainer } from '../../../../globalStyles';

export function KeepMountedModal(props: any) {

    const { error, errorMessage, severityStatus, handleError } = useError();

	const [checked, setChecked] = useState(false);
	const [id, setId] = useState<number>()
	const [name, setName] = useState('');
	const [rule, setRule] = useState<number>();
	const [status, setStatus] = useState('');
	const [newPassword, setNewPassword] = useState('');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked = !checked);
	};

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => { setName(e.target.value); };
	const handleRuleChange = (e: React.ChangeEvent<HTMLInputElement>) => { setRule(parseInt(e.target.value)); };
	const handleStatusChange = (e: SelectChangeEvent) => { setStatus(e.target.value); };
	const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => { setNewPassword(e.target.value); };

	if (typeof props.selectedUserData === 'object' && id !== props.selectedUserData['id']) {
		if ('id' in props.selectedUserData && props.selectedUserData['id'] !== id) {
			setId(props.selectedUserData['id']);
		}

		if ('name' in props.selectedUserData && props.selectedUserData['name'] !== name) {
			setName(props.selectedUserData['name']);
		}

		if ('department_id' in props.selectedUserData && props.selectedUserData['department_id'] !== rule) {
			setRule(props.selectedUserData['department_id']);
		}

		if ('status' in props.selectedUserData && props.selectedUserData['status'] !== status) {
			setStatus(props.selectedUserData['status']);
		}
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await axios.patch('http://localhost:4000/getUsers', {
			id: id,
			name: name,
			rule: rule,
			status: status,
			newPassword: newPassword
		}).then((response) => {
			handleError(response.data)
		})
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
				<Container className='flex' onSubmit={handleSubmit}>
					<div className='container flex'>
						<InputContainer>
							<div className="text">
								<p>Nome: </p>
							</div>
							<TextField id="standard-basic" variant="standard" onChange={handleNameChange} value={name}/>
						</InputContainer>
						<InputContainer>
							<div className="text">
								<p>Nivel de acesso: </p>
							</div>
							<input type="number" id="rule" name="rule" min="1" max="17" value={rule} onChange={handleRuleChange}/>
						</InputContainer>
						<InputContainer>
							<div className="text">
								<p>Status: </p>
							</div>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">Status</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={status}
									label="Status"
									onChange={handleStatusChange}
								>
									<MenuItem value='normal'>normal</MenuItem>
									<MenuItem value='Desativado'>Desativado</MenuItem>
								</Select>
							</FormControl>
						</InputContainer>
						<FormControlLabel
							control={
								<Switch checked={checked} onChange={handleChange} />
							}
							label="Trocar senha"
						/>
						{
							checked ? 
							<InputContainer>
								<div className="text">
									<p>Nova senha: </p>
								</div>
								<TextField id="standard-basic" variant="standard" onChange={handleNewPasswordChange} value={newPassword}/>
							</InputContainer>
							:
							<></>
						}
					</div>
					<Button type='submit' variant="contained">Atualizar Usuário</Button>
				</Container>
			</Modal>
		</div>
	);
}