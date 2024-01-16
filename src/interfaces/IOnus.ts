export type IOnu = {
    onu: {
        slot: number;
        pon: number;
        model: string;
        serialNumber: string;
        rxPower?: string;
    }
}

export type IOnus = {
    onu: Array<{
        slot: number;
        pon: number;
        model: string;
        serialNumber: string;
        rxPower?: string;
    }>
}