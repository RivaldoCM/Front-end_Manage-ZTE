export type IOnu = {
    onu: {
        slot: number;
        pon: number;
        model: string;
        oltId: number;
        modelOlt: string;
        serialNumber: string;
        rxPower?: string;
        whichOltIndex: number;
    }
}

export type IOnus = {
    slot: number;
    pon: number;
    model: string;
    modelOlt: string;
    serialNumber: string;
    rxPower?: string;
    whichOltIndex: number;
}