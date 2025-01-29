import dayjs from "dayjs";
import { ChatContainer, MessageDestinationDepartmentTicket, MessageOriginDepartmentTicket } from "./style";
import { useEffect, useRef } from "react";
import { IChatLog } from "../../interfaces/ITickets";

export function Chat({ messages, me } : {messages: IChatLog[], me: number}){

    const messagesScrollDown = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(messagesScrollDown.current){
            messagesScrollDown.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages]);

    return(
        <ChatContainer>
           {
            messages && messages.map((message, index) => {
                console.log(message.is_automatic)
                if(message.is_automatic){
                    return(
                        <MessageDestinationDepartmentTicket key={index}>
                        <div className="header">
                            <p className="sender">EVENTO</p>
                            <span className="timestamp">{dayjs(message.created_at).format('HH:mm')}</span>
                        </div>
                        <div className="divider"></div>
                        <div className="content">
                            <p>{message.message}</p>
                        </div>
                    </MessageDestinationDepartmentTicket>
                    )

                } else if(message.User.id === me){
                    return(
                        <MessageDestinationDepartmentTicket key={index}>
                            <div className="header">
                                <p className="sender">{message.User.name}</p>
                                <span className="timestamp">{dayjs(message.created_at).format('HH:mm')}</span>
                            </div>
                            <div className="divider"></div>
                            <div className="content">
                                <p>{message.message}</p>
                            </div>
                        </MessageDestinationDepartmentTicket>
                    )
                } else {
                    return(
                        <MessageOriginDepartmentTicket key={index}>
                            <div className="header">
                                <p className="sender">teste</p>
                                <span className="timestamp">{dayjs(message.created_at).format('HH:mm')}</span>
                            </div>
                            <div className="divider"></div>
                            <div className="content">
                                <p>{message.message}</p>
                            </div>
                        </MessageOriginDepartmentTicket>
                    )
                }
            })
        }
        <div ref={messagesScrollDown}></div>
        </ChatContainer>
    )
}