import { Socket, io } from 'socket.io-client';
import { ReactNode, createContext, useEffect, useState, } from "react";

export const SocketContext = createContext<{
    socket: Socket,
    rooms: string[]
}| null>(null);


export function SocketContextProvider({ children }: {children: ReactNode}) {
    const [socket, setSocket] = useState<any>(null);

    const rooms = ['/break_time']

    useEffect(() => {
        const newSocket = io('http://localhost:4000');
        setSocket(newSocket);
    }, []);

    return (
        <SocketContext.Provider value={{ socket, rooms }}>
            {children}
        </SocketContext.Provider>
    );
}