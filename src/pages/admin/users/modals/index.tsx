import React, { useState } from 'react';

import { useError } from '../../../../hooks/useError';
import { useLoading } from '../../../../hooks/useLoading';

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
import { CircularProgress } from '@mui/material';
import { updateUser } from '../../../../services/apiManageONU/updateUser';

export function EditUsersModal(props: any) {
    const { error, errorMessage, severityStatus, handleError } = useError();
    const { isLoading, startLoading, stopLoading } = useLoading();

	const [checked, setChecked] = useState(false);
	const [id, setId] = useState<number | undefined>();
	const [name, setName] = useState('');
	const [rule, setRule] = useState<number | undefined>();
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
			setName(props.selectedUserData['name']);
			setRule(props.selectedUserData['department_id']);
			setStatus(props.selectedUserData['status']);
		}
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		startLoading();

		const response = await updateUser(id!, name, rule!, status, newPassword);
		props.handleClose();
		stopLoading();

        if(!response.success){
			handleError(response.messages.message);
		}
		handleError(response.responses.status);
	}

	return (
		<div>
			<IconButton onClick={props.handleOpen}>
				<EditOutlinedIcon />
			</IconButton>
			<Modal
				open={props.open}
				onClose={props.handleClose}
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
									<input type="number" id="rule" name="rule" min="1" max="21" value={rule} onChange={handleRuleChange}/>
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
						{
							(isLoading ?
								<div className="flex">
									<CircularProgress className="MUI-CircularProgress" color="primary"/>
								</div>
								:
								<SubmitModal className="button flex">
									<Button type='submit' variant="contained">Atualizar Usuário</Button>
								</SubmitModal>
							)
						}
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
		</div>
	);
}