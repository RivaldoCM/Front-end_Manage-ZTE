import React, { useState } from 'react';

import Modal from '@mui/material/Modal';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
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
import axios from 'axios';

export function KeepMountedModal(props: any) {
	const [checked, setChecked] = useState(false);
	const [id, setId] = useState<number>()
	const [name, setName] = useState('');
	const [rule, setRule] = useState<any>();
	const [status, setStatus] = useState('');
	const [newPassword, setNewPassword] = useState('');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked = !checked);
	};

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => { setName(e.target.value); };
	const handleRuleChange = (e: React.ChangeEvent<HTMLInputElement>) => { setRule(e.target.value); };
	const handleStatusChange = (e: SelectChangeEvent) => { setStatus(e.target.value as string); };
	const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => { setNewPassword(e.target.value); };

	if(typeof props.selectedUserData && name === ''){
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
		const response = await axios.put('http://localhost:4000/getUsers', {
			id: id,
			name: name,
			rule: rule,
			status: status,
			newPassword: newPassword
		}).then((response) => {
			console.log(response)
		})
	}

	return (
		<div>
			<IconButton onClick={props.handleOpen}>
				<AddCircleOutlineRoundedIcon />
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
							<TextField id="standard-basic" variant="standard" onChange={handleNameChange} defaultValue={name}/>
						</InputContainer>
						<InputContainer>
							<div className="text">
								<p>Permissões: </p>
							</div>
							<TextField id="standard-basic" variant="standard" onChange={handleRuleChange} defaultValue={rule}/>
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
