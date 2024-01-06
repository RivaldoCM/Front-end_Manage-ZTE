import { useError } from '../../../../hooks/useError';

import { deleteOlt } from '../../../../services/apiManageONU/deleteOlt';
import { useLoading } from '../../../../hooks/useLoading';

import { FormController, DefaultStyledModal, FormModal, CloseButton, SubmitModal } from '../../../../styles/modal';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { CircularProgress } from '@mui/material';


export function KeepMountedDeleteOltModal(props: any) {
    const { error, errorMessage, severityStatus, handleError } = useError();
	const { isLoading, startLoading, stopLoading } = useLoading();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		startLoading();

		const response = await deleteOlt(props.oltDataSelected.id);
		props.handleClose();
		stopLoading();
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
                    <FormModal className='flex'>
						<div className="text">
							<p>Você está apagando os dados da OLT de: {props.oltDataSelected.name} </p>
						</div>
                    </FormModal>
					{
						(isLoading ?
							<div className="flex">
								<CircularProgress className="MUI-CircularProgress" color="primary"/>
							</div>
							:
							<SubmitModal className="button flex">
								<Button type='submit' variant="contained">Confirmar</Button>
							</SubmitModal>
						)
					}

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