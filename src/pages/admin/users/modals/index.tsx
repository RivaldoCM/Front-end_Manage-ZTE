import axios from 'axios';
import React, { useState } from 'react';

import { useError } from '../../../../hooks/useError';

import { InputContainer } from '../../../../styles/globalStyles';
import { FormController, CloseButton, DefaultStyledModal, FormModal, SubmitModal } from '../../../../styles/modal';
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
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';

export function EditUsersModal(props: any) {
    const { error, errorMessage, severityStatus, handleError } = useError();

	const [checked, setChecked] = useState(false);
	const [id, setId] = useState<number>();
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

		await axios({
			method: 'patch',
			url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/getUsers`,
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
			},
			data:{
				id: id,
				name: name,
				rule: rule,
				status: status,
				newPassword: newPassword
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
				open={props.open}
				onClose={props.handleClose}
				aria-labelledby="keep-mounted-modal-title"
				aria-describedby="keep-mounted-modal-description"
			>
				<DefaultStyledModal onSubmit={handleSubmit}>
					<FormController>
                    <CloseButton className="flex">
                        <IconButton aria-label="close" onClick={props.handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </CloseButton>
					<FormModal>
						<InputContainer>
							<div className="text">
								<p>Nome: </p>
							</div>
							<div className="content">
								<TextField id="standard-basic" variant="standard" onChange={handleNameChange} value={name}/>
							</div>
						</InputContainer>
						<InputContainer>
							<div className="text">
								<p>Nivel de acesso: </p>
							</div>
							<div className="content">
								<input type="number" id="rule" name="rule" min="1" max="17" value={rule} onChange={handleRuleChange}/>
							</div>
						</InputContainer>
						<InputContainer>
							<div className="text">
								<p>Status: </p>
							</div>
							<div className="content">
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
							</div>
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
								<div className="content">
									<TextField id="standard-basic" variant="standard" onChange={handleNewPasswordChange} value={newPassword}/>
								</div>
								
							</InputContainer>
							:
							<></>
						}
						<SubmitModal>
							<div className="button flex">
								<Button type='submit' onClick={props.handleClose} variant="contained">Atualizar Usuário</Button>
							</div>
						</SubmitModal>
					</FormModal>
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