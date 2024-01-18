import { IAuthOnuProps } from "./IAuthOnuProps";

export interface IUpdateConnectionProps {
    onuId?: number;
    connectionId: number;
    pppoeUser: string;
    pppoepassword: string;
    slot: number;
    pon: number;
    serialNumber: string;
    onuType: string;
    accessPointId: number[];
    wifiSSID: string;
    wifiPass: string;
}