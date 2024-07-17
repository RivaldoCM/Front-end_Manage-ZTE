import { useState } from "react";

import { useResponse } from "../../../hooks/useResponse";

import { finishMassive } from "../../../services/apiManageONU/finishMassive";

import { IUsers } from "../../../interfaces/IUsers";

import { FormAddPeopleMassive } from "../style";
import { FormControl, IconButton, InputLabel, MenuItem, Modal, Select, SelectChangeEvent } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

type LocalFinishMassive = {
    open: boolean,
    handleClose: () => void;
    massive: {
        userId?: IUsers['id'];
        massiveId: IMassive['id'];
    }
}

export function FinishMassive(props: LocalFinishMassive){
    const { setFetchResponseMessage } = useResponse();

    const [resolution, setResolution] = useState<number>(1);

    const handleChange = (e: SelectChangeEvent<string>) => {
        setResolution(parseInt(e.target.value));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await finishMassive({
            finished_by: props.massive.userId,
            massiveId: props.massive.massiveId,
            finished_status: resolution,
        });

        if(response){
            if(!response.success){
                setFetchResponseMessage(response.messages.message);
            }
        } else {
            setFetchResponseMessage('error/no-connection-with-API');
        }
        props.handleClose();
    }

    return(
        <Modal
            open={props.open}
            onClose={props.handleClose}
        >
            <FormAddPeopleMassive onSubmit={handleSubmit}>
                <h4>Finalizar Massiva</h4>
                <FormControl sx={{ width: 300 }}>
                    <InputLabel>Motivo</InputLabel>
                    <Select
                        value={resolution.toString()}
                        label="Motivo"
                        onChange={handleChange}
                    >
                        <MenuItem value={1}>Resolvido</MenuItem>
                        <MenuItem value={0}>Aberto por engano</MenuItem>
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