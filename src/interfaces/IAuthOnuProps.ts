export interface IAuthOnuProps {
    cpf: string,
    ip: string[],
    isPizzaBox: number,
    type: string,
    pppoe: string,
    pppoePass?: string,
    wifiSSID?: string,
    wifiPass?: string,
}