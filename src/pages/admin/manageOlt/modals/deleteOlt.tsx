import { useError } from '../../../../hooks/useError';

import { AddOlt, DefaultStyledModal, FormModal, CloseButton, SubmitModal } from './style';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { deleteOlt } from '../../../../services/apiManageONU/deleteOlt';

export function KeepMountedDeleteOltModal(props: any) {
    const { error, errorMessage, severityStatus, handleError } = useError();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const response = await deleteOlt(props.oltDataSelected.id);

		console.log(response)

		if(!response.success){
			handleError(response.messages.message);
		}

		handleError(response.responses.status);
	}

	return (
		<>
			<IconButton onClick={props.handleOpen} title="Delete">
				<DeleteOutlineOutlinedIcon />
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
						<div className="text">
							<p>Você está apagando os dados da OLT de: {props.oltDataSelected.name} </p>
						</div>
                    </FormModal>
                    <SubmitModal className="button flex">
                    	<Button type='submit' onClick={props.handleClose} variant="contained">Confirmar</Button>
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
		</>
	);
}