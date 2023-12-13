import { WriteONUProps } from "./WriteONUProps";

export interface IDataOnu {
    placa: number; 
    pon: number; 
    model: string; 
    serial: string; 
    ip?: string;
}

export interface IAuthOnuProps extends WriteONUProps{
    dataOnu: IDataOnu[],
    cpf: string,
    pppoe: string,
    pppoePass: string,
    wifiSSID: string,
    wifiPass: string,
}