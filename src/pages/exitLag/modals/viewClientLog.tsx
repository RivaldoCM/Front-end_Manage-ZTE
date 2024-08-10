import { useEffect, useState } from "react";

import { Modal } from "@mui/material";

import { ViewLogsClient } from "../style";
import { getExitLagLog } from "../../../services/apiManageONU/getExitLagLog";

type ILocalViewLogsProps = {
    open: boolean,
    selectedClient: {
        client: {
            User_ExitLag_created_by?: string;
            User_ExitLag_updated_by?: string;
            name?: string;
            email: string;
            status: string;
        },
        active: number;
    },
    handleClose: () => void
}

export function ViewClientLog(props: ILocalViewLogsProps){
    const [client, setClient] = useState<Pick<ILocalViewLogsProps, "selectedClient"> | null>(null);
    console.log(client)
    useEffect(() => {
        async function getClient(){
            const response = await getExitLagLog(props.selectedClient.client.email);
            if(response){
                if(response.success){
                    response.responses.response.length > 0 ?? setClient(response.responses.response);
                } else {

                }
            }
        }
        getClient();
    }, []);

    return(
        <Modal
            open={props.open}
            onClose={props.handleClose}
        >
            <ViewLogsClient>
                {
                    client && (
                        <div>
                            {client.selectedClient.client}
                        </div>
                    )
                }
            </ViewLogsClient>
        </Modal>
    )
}