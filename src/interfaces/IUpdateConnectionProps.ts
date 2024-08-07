export interface IUpdateConnectionProps {
    onuId?: number;
    connectionId: number;
    pppoeUser: string;
    pppoePassword: string;
    slot?: number;
    pon: number;
    serialNumber: string;
    modelOlt: string;
    accessPointId: number | string;
    wifiSSID?: string;
    wifiPass?: string;
}