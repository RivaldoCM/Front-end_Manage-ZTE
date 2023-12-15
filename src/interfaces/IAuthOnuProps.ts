import { WriteONUProps } from "./WriteONUProps";

export interface IDataOnu {
    ip?: string;
    signal?: string;
    placa: number; 
    pon: number; 
    model: string; 
    serial: string; 
    accessPoint: number[];
}

export interface IAuthOnuProps extends WriteONUProps{
    dataOnu: IDataOnu,
    cpf: string,
    pppoe: string,
    pppoePass: string,
    wifiSSID: string,
    wifiPass: string,
}