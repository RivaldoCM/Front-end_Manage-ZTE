import { useContext } from 'react';
import { TicketContext } from '../contexts/TicketContext';

export function useTickets(){
    const context = useContext(TicketContext);
    if (!context) {
      throw new Error("useTicket must be used within an TicketsContextProvider");
    }
    return context;
}