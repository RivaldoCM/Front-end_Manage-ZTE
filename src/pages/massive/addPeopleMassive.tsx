import { IconButton, Modal, TextField } from "@mui/material";
import { useState } from "react";
import { FormAddPeopleMassive } from "./style";

import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { isValidCpf } from "../../config/regex";
import { addClientMassive } from "../../services/apiManageONU/addClientMassive";

export function AddPeopleToMassive(props: any){
    const [cpf, setCpf] = useState<string>('');
    const handleChangeCpf = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setCpf(e.target.value);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(cpf.match(isValidCpf)){
            const response = await addClientMassive({
                cpf: cpf,
                cityId: props.massive.cityId,
                massiveId: props.massive.massiveId,
                userId: props.massive.userId
            });
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
                    <IconButton color="error" onClick={props.handleClose}>
                        <CloseIcon />
                    </IconButton>
                    <IconButton color="success" type="submit">
                        <DoneIcon />
                    </IconButton>
                </div>
            </FormAddPeopleMassive>
        </Modal>
    )
}