import Modal from '@mui/material/Modal';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import IconButton from '@mui/material/IconButton';

import { Container } from './style';

export function KeepMountedModal(props: any) {
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
					
				</Container>
			</Modal>
		</div>
	);
}
