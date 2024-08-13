import { useEffect, useState } from "react";

import { IconButton, Modal } from "@mui/material";

import { ViewLogsClient } from "../style";
import { getExitLagLog } from "../../../services/apiManageONU/getExitLagLog";
import CloseIcon from '@mui/icons-material/Close';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';

type ILocalViewLogsProps = {
    open: boolean,
    selectedClient: {
        client: {
            User_ExitLag_created_by?: {
                name: string;
            };
            User_ExitLag_updated_by?: {
                name: string;
            };
            name?: string;
            email: string;
            status: string;
        },
        active: number;
    },
    handleClose: () => void
}
type ClientInfo = ILocalViewLogsProps["selectedClient"]["client"];

export function ViewClientLog(props: ILocalViewLogsProps){
    const [client, setClient] = useState<ClientInfo | null>(null);

    useEffect(() => {
        async function getClient(){
            const response = await getExitLagLog(props.selectedClient.client.email);
            if(response){
                if(response.success){
                    response.responses.response.length > 0 ? setClient(response.responses.response[0]) : setClient(null);
                } else {

                }
            }
        }
        getClient();
    }, []);

    return(
        <Modal
            className="flex"
            open={props.open}
            onClose={props.handleClose}
        >
            <ViewLogsClient>
                <div className="flex">
                    {
                        client ?
                        <div className="flex">
                            <BadgeOutlinedIcon color="primary"/>
                            <p>Nome: {client.name}</p>
                        </div>
                        : <></>
                    }
                    <div className="flex">
                        <SupervisedUserCircleOutlinedIcon color="primary"/>
                        {
                           client ? <p>Criado por: {client.User_ExitLag_created_by?.name}</p> 
                           : <p>Não foi criado através deste sistema.</p>
                        }
                    </div>
                    <div className="flex">
                        <EditOutlinedIcon color="primary"/>
                        {
                           client ? <p>Atualizado por: {client.User_ExitLag_updated_by?.name}</p> 
                           : <p>Nenhuma atualização desde sua criação.</p>
                        }
                    </div>
                </div>
                <div className="flex">
                    <IconButton color="error" onClick={props.handleClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </ViewLogsClient>
        </Modal>
    )
}