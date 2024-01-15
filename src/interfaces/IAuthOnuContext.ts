type IAuthOnuContext = {
    ip: string[];
    userId: number;
    oltId: number[];
    cityId: number;
    city: string;
    serial: string;
    slot: number;
    pon: number;
    cpf: string,
    pppoeUser: string;
    pppoePassword: string,
    wifiName: string,
    wifiPassword: string,
    onuType: string;
    oltType: string;
    voalleAccessPointId: number[];
}