export type ITickets = {
    id: number;
    Origin_department:{
        id: number,
        name: string;
    };
    Destination_department:{
        id: number,
        name: string;
    };
    User_created_by:{
        name: string;
    };
    User_updated_by?:{
        name: string;
    };
    User_finished_by?:{
        name: string;
    };
    User_appropriated_by?:{
        name: string
    };
    Ticket_Types:{
        id: number,
        name: string;
    };
    Tickets_city:{
        id: number,
        name: string;
    };
    Tickets_cto?:{
        id: number,
        number: number;
        name: string;
        lat: string;
        lng: string;
        Olts:{
            name: string;
        }
    };
    Ticket_status:{
        id: number;
        name: string;
    };
    localization: string;
    created_at: string;
    updated_at?: string;
    finished_at?: string;
    is_viwed: boolean;
    is_opened: boolean;
    description: string;
}

export type ITicketTypes = {
    id: number;
    name: string;
}

export type ITicketsForm = {
    userId: number;
    ticketId: number;
    originDepartmentId: number;
    destinationDepartmentId: number | null;
    cityId: number | null;
    ticketTypeId: number | null;
    ctoId: number | null;
    localization: string;
    description: string;
}

export type ITicketStatus = {
    id: number;
    name: string;
}

export type IChatLog = {
    message: string;
    is_automatic: boolean;
    created_at: Date;
    User:{
        id: number;
        name: string;
        department_id: string;
    }
}