import { ReactNode, createContext, useEffect, useState, } from "react";
import { useSocket } from "../hooks/useSocket";
import { useAuth } from "../hooks/useAuth";
import { ITickets } from "../interfaces/ITickets";
import { getTickets } from "../services/apiManageONU/getTickets";

export const TicketContext = createContext<{
    tickets: ITickets[],
}| null>(null);

export function TicketContextProvider({ children }: {children: ReactNode}) {
    const { user } = useAuth();
    const { socket } = useSocket();

    const [tickets, setTickets] = useState<ITickets[]>([]);

    useEffect(() => {
        const getData = async () => {
            let response;
            
            response = await getTickets({departmentId: user.rule});
            response.success ? setTickets(response.responses.response) : setTickets([]);
        }
        getData();
    }, []);

    if(socket){
        socket.emit('select_room', {
            uid: user?.uid,
            room: '/tickets'
        });

        socket.on('update-tickets', data => {
            setTickets(data.responses.response);
        });
    }

    return (
        <TicketContext.Provider value={{ tickets }}>
            {children}
        </TicketContext.Provider>
    );
}