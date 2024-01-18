export interface IAuthOnuProps {
    ip: string[],
    slot: number,
    pon: number,
    serialNumber: string,
    contract: number,
    isPizzaBox: boolean[],
    type: string,
    pppoeUser: string,
    pppPass?: string,
    wifiSSID?: string,
    wifiPass?: string,
}