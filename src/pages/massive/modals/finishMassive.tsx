import { FormControl, IconButton, InputLabel, MenuItem, Modal, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { FormAddPeopleMassive } from "../style";

import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { useResponse } from "../../../hooks/useResponse";
import { finishMassive } from "../../../services/apiManageONU/finishMassive";

export function FinishMassive(props: any){
    const { setFetchResponseMessage } = useResponse();

    const [resolution, setResolution] = useState<string>('');

    const handleChange = (e: SelectChangeEvent<string>) => {
        setResolution(e.target.value);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await finishMassive({
            massiveId: props.massive.massiveId,
            finished_status: resolution,
            userId: props.massive.userId
        });

    }

    return(
        <Modal
            open={props.open}
            onClose={props.handleClose}
        >
            <FormAddPeopleMassive onSubmit={handleSubmit}>
                <h4>Finalizar Massiva</h4>
                <FormControl fullWidth>
                    <InputLabel>Motivo</InputLabel>
                    <Select
                        value={resolution}
                        label="Motivo"
                        onChange={handleChange}
                    >
                        <MenuItem value='Solved'>Resolvido</MenuItem>
                        <MenuItem value='Error'>Aberto errado</MenuItem>
                    </Select>
                </FormControl>
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