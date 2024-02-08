type IOnuLogs = {
    id: number;
    created_at: string;
    slot: number;
    pon: number;
    serial_onu: string;
    pppoe: string;
    rx_power: string;
    onuRx_power: string;
    is_auth: boolean;
    User:{
        name: string;
    }
    City: {
        name: string
    },
    Olt: {
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
        pppoe: string;
        rx_power: string;
        onuRx_power: string;
        is_auth: boolean;
        User:{
            name: string;
        }
        City: {
            name: string
        },
        Olt: {
            name: string;
        }
    }
}