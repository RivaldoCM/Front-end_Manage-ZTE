import React, { useState } from 'react';

import Modal from '@mui/material/Modal';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';

import { Container } from './style';
import { InputContainer } from '../../../../globalStyles';

export function KeepMountedModal(props: any) {
	const [checked, setChecked] = useState(false);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked = !checked);
	};

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
						<TextField id="standard-basic" variant="standard" />
					</InputContainer>
					<InputContainer>
						<div className="text">
							<p>Permissões: </p>
						</div>
						<TextField id="standard-basic" variant="standard" />
					</InputContainer>
					<InputContainer>
						<div className="text">
							<p>Status: </p>
						</div>
						<TextField id="standard-basic" variant="standard" />
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
