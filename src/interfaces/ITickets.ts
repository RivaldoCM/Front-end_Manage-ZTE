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
        name: string;
    };
    Tickets_city_id:{
        name: string;
    };
    Tickets_cto_id?:{
        name: string;
        lat: string;
        lng: string
    };
    Ticket_status:{
        name: string;
    };
    localization: string;
    created_at: string;
    updated_at?: string;
    finished_at?: string;
    is_viwed: boolean;
    is_opened: boolean;
}

export type ITicketTypes = {
    id: number;
    name: string;
}

export type ITicketsForm = {
    userId: number;
    originDepartmentId: number;
    destinationDepartmentId: number | null;
    cityId: number | null;
    oltId: number | null;
    ticketTypeId: number | null;
    ctoId: number | null;
    location: string;
    description: string;
}