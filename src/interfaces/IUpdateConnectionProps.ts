export interface IUpdateConnectionProps {
    onuId?: number;
    connectionId: number;
    pppoeUser: string;
    pppoePassword: string;
    slot?: number;
    pon: number;
    serialNumber: string;
    modelOlt: number;
    accessPointId: number[];
    wifiSSID?: string;
    wifiPass?: string;
}