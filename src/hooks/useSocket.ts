import { useContext } from 'react';
import { SocketContext } from '../contexts/SocketContext';

export function useSocket(): any{
    const context = useContext(SocketContext);

    if (!context) {
        throw new Error("useSocket must be used within an AuthContextProvider");
    }
    return context;
}