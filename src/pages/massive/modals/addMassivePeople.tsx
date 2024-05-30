import { IconButton, Modal, TextField } from "@mui/material";
import { useState } from "react";
import { FormAddPeopleMassive } from "../style";

import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { isValidCpf } from "../../../config/regex";
import { addClientMassive } from "../../../services/apiManageONU/addClientMassive";
import { getPeopleId } from "../../../services/apiVoalle/getPeopleId";
import { useResponse } from "../../../hooks/useResponse";
import { IResponseData, IResponseError } from "../../../interfaces/IDefaultResponse";

export function AddMassivePeople(props: any){
    const { setFetchResponseMessage } = useResponse();

    const [cpf, setCpf] = useState<string>('');

    const handleChangeCpf = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCpf(e.target.value);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let response: IResponseData | IResponseError;

        if(!cpf.match(isValidCpf)){
            setFetchResponseMessage('warning/invalid-cpf-input');
        } else {
            const clientData = await getPeopleId(cpf) as any;
            if(clientData){
                response = await addClientMassive({
                    cpf: cpf,
                    name: clientData.name,
                    address: `${clientData.mainAddress.streetType}  ${clientData.mainAddress.street}  N°${clientData.mainAddress.number}`,
                    coordinates: `${clientData.mainAddress.latitude}, ${clientData.mainAddress.longitude}`, 
                    cityId: props.massive.cityId,
                    massiveId: props.massive.massiveId,
                    userId: props.massive.userId
                });
            } else {
                response = await addClientMassive({
                    cpf: cpf,
                    cityId: props.massive.cityId,
                    massiveId: props.massive.massiveId,
                    userId: props.massive.userId
                });
            }

            if(response.success){
                props.handleClose();
                setFetchResponseMessage(response.responses.status);
            } else {
                props.handleClose();
                setFetchResponseMessage(response.messages.message);
            }
        }
    }

    return(
        <Modal
            open={props.open}
            onClose={props.handleClose}
        >
            <FormAddPeopleMassive onSubmit={handleSubmit}>
                <h4>ADICIONE CLIENTE A ESTE MASSIVA</h4>
                <TextField
                    required
                    label="CPF" 
                    variant="outlined"
                    name="cpf"
                    fullWidth
                    value={cpf}
                    onChange={handleChangeCpf}
                    sx={{ mt: 2 }}
                />
                <div className="flex">
                    <IconButton color="success" type="submit">
                        <DoneIcon />
                    </IconButton>
                    <IconButton color="error" onClick={props.handleClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </FormAddPeopleMassive>
        </Modal>
    )
}