import { Modal } from "@mui/joy";
import { useEffect } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { useResponse } from "../../../../hooks/useResponse";
import { ViewTicketStyle } from "../style";

export function ViewTicketModal(props: any){
    const { user } = useAuth();
    const { setFetchResponseMessage } = useResponse();

    useEffect(() => {
        async function ticket(){
            const ticketData = await getTicketData(props.ticket.id);

            if(ticketData){
                if(ticketData.success){
                    setTicket(props.ticket);
                    setTicketData(ticketData.responses.response);
                }else{
                    setTicket(undefined);
                    setFetchResponseMessage('error/no-connection-with-API');
                }
            } else {
                setFetchResponseMessage('error/no-connection-with-API');
            }
        }
        ticket();
    }, []);

    return(
        <Modal
            className="flex"
            open={props.open}
            onClose={props.handleClose}

        >
            <ViewTicketStyle></ViewTicketStyle>
        </Modal>
    )
}
