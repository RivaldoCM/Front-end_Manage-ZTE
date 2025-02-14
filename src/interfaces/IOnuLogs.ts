type IOnuLogs = {
    id: number;
    created_at: string;
    slot: number;
    pon: number;
    serial_onu: string;
    cpf: string;
    pppoe: string;
    rx_olt: string;
    rx_onu: string;
    is_auth: boolean;
    is_updated: boolean;
    User:{
        name: string;
    }
    Cities: {
        name: string
    },
    Olts: {
        name: string;
    }
}

type IOnuLogsProps = {
    row:{
        id: number;
        created_at: string;
        slot: number;
        pon: number;
        serial_onu: string;
        cpf: string;
        pppoe: string;
        rx_olt: string;
        rx_onu: string;
        is_auth: boolean;
        is_updated: boolean;
        User:{
            name: string;
        }
        Cities: {
            name: string
        },
        Olts: {
            name: string;
        }
    }
}