import { ReactNode, createContext, useEffect, useState, } from "react";

import { useAuth } from "../hooks/useAuth";
import { useSocket } from "../hooks/useSocket";

import { IChatLog, ITickets } from "../interfaces/ITickets";

import { getTickets } from "../services/apiManageONU/getTickets";
import { getChatLog } from "../services/apiManageONU/getChatLog";

export const TicketContext = createContext<{
    tickets: ITickets[],
    chatLog: IChatLog[]
    setChatLogListener: any

}| null>(null);

export function TicketContextProvider({ children }: {children: ReactNode}) {
    const { user } = useAuth();
    const { socket } = useSocket();

    const [tickets, setTickets] = useState<ITickets[]>([]);
    const [chatLog, setChatLog] = useState([]);
    const [chatLogListener, setChatLogListener] = useState({
        ticketId: 0,
        isOpened: false
    });

    useEffect(() => {
        const getData = async () => {
            const response = await getTickets({departmentId: user.rule});
            response.success ? setTickets(response.responses.response) : setTickets([]);
        }
        getData();
    }, []);

    useEffect(() => {
        if(chatLogListener.isOpened){
            const getData = async () => {
                const response = await getChatLog({ticketId: chatLogListener.ticketId});
                response.success ? setChatLog(response.responses.response) : setChatLog([]);
            }
            getData();
        }
    }, [chatLogListener.isOpened]);

    if(socket){
        if(chatLogListener.isOpened){
            //SE ABRIR O CHAT, PEGA AS MENSAGENS DAQUELE TICKET
            socket.emit('select_room', {
                uid: user?.uid,
                room: `/ticket/chat/${chatLogListener.ticketId}`
            });
        }

        socket.emit('select_room', {
            uid: user?.uid,
            room: '/tickets'
        });

        socket.on('update-tickets', data => {
            setTickets(data.responses.response);
        });

        socket.on('new-message', data => {
            setChatLog(data.responses.response);
        });
    }

    return (
        <TicketContext.Provider value={{ tickets, chatLog, setChatLogListener }}>
            {children}
        </TicketContext.Provider>
    );
}