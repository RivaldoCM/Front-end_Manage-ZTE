export type IOnu = {
    onu: {
        slot: number;
        pon: number;
        model: string;
        modelOlt: number;
        serialNumber: string;
        rxPower?: string;
        whichOltIndex: number;
    }
}

export type IOnus = {
    slot: number;
    pon: number;
    model: string;
    modelOlt: number;
    serialNumber: string;
    rxPower?: string;
    whichOltIndex: number;
}