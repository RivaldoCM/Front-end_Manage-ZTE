import { useEffect, useState } from "react";

import { Modal } from "@mui/material";

import { ViewLogsClient } from "../style";
import { getExitLagLog } from "../../../services/apiManageONU/getExitLagLog";

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
                {
                    client && (
                        <div>
                            {client.User_ExitLag_created_by ? 
                            
                                <p>Criado por: {client.User_ExitLag_created_by.name}</p> : 
                                <p>Não foi criado por este sistema.</p>
                            }
                            {
                                client.User_ExitLag_updated_by ? 
                                <p>Editado por: {client.User_ExitLag_updated_by.name}</p> :
                                <p></p>
                            }
                        </div>
                    )
                }
            </ViewLogsClient>
        </Modal>
    )
}