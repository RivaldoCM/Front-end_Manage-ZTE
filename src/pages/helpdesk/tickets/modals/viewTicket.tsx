import { Modal, ModalClose } from "@mui/joy";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { useResponse } from "../../../../hooks/useResponse";
import { ViewTicketStyle } from "../style";
import { ITickets } from "../../../../interfaces/ITickets";
import dayjs from "dayjs";
import { updateTicket } from "../../../../services/apiManageONU/updateTicket";

type ViewTicketPropsLocal = {
    open: boolean;
    ticket: ITickets;
    handleClose: () => void;
}

export function ViewTicketModal(props: ViewTicketPropsLocal){
    const { user } = useAuth();
    const { setFetchResponseMessage } = useResponse();

    useEffect(() => {
        async function updateData(){
            if(!props.ticket.is_viwed && user.rule === props.ticket.Destination_department.id){
                await updateTicket({ ticketId: props.ticket.id, isViwed: true});
            }
        }
        updateData();
    }, []);

    return(
        <Modal
            className="flex"
            open={props.open}
            onClose={props.handleClose}
        >
            <ViewTicketStyle>
                <header>
                    <p>ID: {props.ticket.id}</p>
                    <p>{props.ticket.Ticket_Types.name}</p>
                    <ModalClose variant="outlined" />
                </header>
                <section>
                    <p>
                        Aberto por: {props.ticket.User_created_by.name},
                        Equipe {props.ticket.Origin_department.name}, 
                        No dia {dayjs(props.ticket.created_at).add(3, "hour").format('DD/MM/YY [às] HH:mm') + 'hrs'}
                    </p>
                    <p>
                        Apropriado por: 
                        {   props.ticket.User_appropriated_by ? 
                                props.ticket.User_appropriated_by.name 
                            :   ""
                        }
                    </p>
                    <p>localização: {props.ticket.localization}</p>
                    <p>Descrição: </p>
                </section>
                <footer>
                    FINALIZAR
                </footer>
            </ViewTicketStyle>
        </Modal>
    )
}
