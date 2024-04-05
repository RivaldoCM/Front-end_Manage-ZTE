import { io } from 'socket.io-client';
import { createContext, useEffect, useState, } from "react";

export const SocketContext = createContext<any>(undefined);

export function SocketContextProvider({ children }: {children: any}) {
    const [socket, setSocket] = useState<any>(null);

    useEffect(() => {
        const newSocket = io('http://localhost:4000');
        console.log(newSocket)
        setSocket(newSocket);
    }, []);

    console.log(socket.id)

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}