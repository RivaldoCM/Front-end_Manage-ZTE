import React, { useEffect, useState } from "react";

import { IconButton, Modal } from "@mui/material";

import { ViewLogsClient } from "../style";
import { getExitLagLog } from "../../../services/apiManageONU/getExitLagLog";
import CloseIcon from '@mui/icons-material/Close';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import { useResponse } from "../../../hooks/useResponse";

type ILocalViewLogsProps = {
    open: boolean,
    selectedClient: IExitLagUsers,
    handleClose: () => void
}

export function ViewClientLog(props: ILocalViewLogsProps){
    const { setFetchResponseMessage } = useResponse();

    const [client, setClient] = useState<IExitLagLogs | null>(null);

    useEffect(() => {
        async function getClient(){
            const response = await getExitLagLog(props.selectedClient.client.email);
            if(response){
                if(response.success){
                    response.responses.response.length > 0 ? 
                    setClient(response.responses.response[0]) : setClient(null);
                } else {
                    setFetchResponseMessage('error/no-connection-with-API');
                }
            } else{
                setFetchResponseMessage('error/no-connection-with-API');
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
                {
                    client && (
                        <React.Fragment>
                            <div className="flex">
                                {
                                    client.name ?
                                    <div className="flex">
                                        <BadgeOutlinedIcon color="primary"/>
                                        <p>Nome: {client.name}</p>
                                    </div>
                                    : <></>
                                }
                                <div className="flex">
                                    <SupervisedUserCircleOutlinedIcon color="primary"/>
                                    {
                                        client.User_ExitLag_created_by?.name ? 
                                        <p>Criado por: {client.User_ExitLag_created_by.name}</p> 
                                        : 
                                        <p>Não foi criado através deste sistema.</p>
                                    }
                                </div>
                                <div className="flex">
                                    <EditOutlinedIcon color="primary"/>
                                    {
                                        client && client.User_ExitLag_updated_by?.name ? 
                                        <p>Atualizado por: {client.User_ExitLag_updated_by.name}</p> 
                                        : 
                                        <p>Nenhuma atualização desde sua criação.</p>
                                    }
                                </div>
                            </div>
                            <div className="flex">
                                <IconButton color="error" onClick={props.handleClose}>
                                    <CloseIcon />
                                </IconButton>
                            </div>
                        </React.Fragment>
                    )
                }
            </ViewLogsClient>
        </Modal>
    )
}