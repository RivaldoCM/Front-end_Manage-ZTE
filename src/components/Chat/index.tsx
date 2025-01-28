import dayjs from "dayjs";
import { ChatContainer, MessageDestinationDepartmentTicket, MessageOriginDepartmentTicket } from "./style";
import { useEffect, useRef } from "react";

export function Chat({ messages, me }){

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
                if(message.is_automatic){

                } else if(message.User.id === me){
                    return(
                        <MessageDestinationDepartmentTicket key={index}>
                            <div className="header">
                                <p className="sender">{message.User.name}</p>
                                <span className="timestamp">{dayjs(message.created_at).format('HH:mm')}</span>
                            </div>
                            <div className="divider"></div>
                            <div className="content">
                                {message.message}
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
                                {message.message}
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