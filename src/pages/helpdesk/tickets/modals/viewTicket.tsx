import { Button, Modal, ModalClose, Option, Select, Textarea } from "@mui/joy";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { useResponse } from "../../../../hooks/useResponse";
import { ViewTicketStyle } from "../style";
import { ITickets } from "../../../../interfaces/ITickets";
import dayjs from "dayjs";
import { updateTicket } from "../../../../services/apiManageONU/updateTicket";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';

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
                    <div>
                        <PushPinOutlinedIcon fontSize="small" color="secondary"/>
                        {props.ticket.User_appropriated_by?.name}
                    </div>
                    <div>
                        <p> Aberto por: {props.ticket.User_created_by.name} </p>
                        <p><CalendarMonthIcon fontSize="small" color="secondary"/> {dayjs(props.ticket.created_at).add(3, "hour").format('DD/MM/YY [às] HH:mm') + 'hrs'}</p>
                    </div>
                    <div>

                    </div>
                    <div>
                        <p>Descrição:</p>
                        <Textarea placeholder="Descrição" minRows={3} disabled value={props.ticket.description}/>
                    </div>
                    
                </section>
                <footer className="flex">
                    <div>
                        Prazo:
                    </div>
                    |
                    <div className="flex">
                        <Select size="md" variant="outlined">
                            <Option value="dog">Dog</Option>
                            <Option value="cat">Cat</Option>
                            <Option value="fish">Fish</Option>
                            <Option value="bird">Bird</Option>
                        </Select>
                    </div>
                    |
                    <div className="flex">
                        <Button size="sm" endDecorator={<ChatOutlinedIcon />} color="primary">
                            Abrir ChatLog
                        </Button>
                    </div>
                </footer>
            </ViewTicketStyle>
        </Modal>
    )
}
