import { Socket, io } from 'socket.io-client';
import { ReactNode, createContext, useEffect, useState, } from "react";

export const SocketContext = createContext<{
    socket: Socket,
    rooms: string[]
}| null>(null);

export function SocketContextProvider({ children }: {children: ReactNode}) {
    const [socket, setSocket] = useState<any>(null);

    const rooms = ['/break_time', '/massive', '/users'];

    useEffect(() => {
        const newSocket = io(import.meta.env.VITE_BASEURL_MANAGE_ONU);
        newSocket.on('connect', () => {
            setSocket(newSocket);
        });

        newSocket.on('disconnect', () => {
            setSocket(null);
        });
    }, []);

    return (
        <SocketContext.Provider value={{ socket, rooms }}>
            {children}
        </SocketContext.Provider>
    );
}