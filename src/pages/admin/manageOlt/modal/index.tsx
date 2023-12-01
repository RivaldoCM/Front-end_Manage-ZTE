import React, { useState } from 'react';

import Modal from '@mui/material/Modal';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import { Container } from './style';
import { InputContainer } from '../../../../globalStyles';

export function KeepMountedModal(props: any) {
	const [checked, setChecked] = useState(false);
	const [id, setId] = useState<number>()
	const [name, setName] = useState('');
	const [rule, setRule] = useState<any>();
	const [status, setStatus] = useState('');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked = !checked);
	};

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => { setName(e.target.value); };
	const handleRuleChange = (e: React.ChangeEvent<HTMLInputElement>) => { setRule(e.target.value); };
	const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => { setStatus(e.target.value); };

	if(typeof props.selectedUserData){
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
				<Container className='flex'>

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
						<TextField id="standard-basic" variant="standard" onChange={handleStatusChange} defaultValue={status} />
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
							<TextField id="standard-basic" variant="standard" />
						</InputContainer>
						:
						<></>
					}
					
					<Button variant="contained">Atualizar Usuário</Button>
				</Container>
			</Modal>
		</div>
	);
}
