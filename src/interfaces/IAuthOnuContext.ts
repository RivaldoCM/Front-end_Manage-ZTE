type IAuthOnuContext = {
    ip: string[];
    oltId: number[];
    cityId: number;
    city: string;
    cpf: string,
    pppoeUser: string;
    pppoePassword: string,
    wifiName: string,
    wifiPassword: string,
    onuType: string;
    onuModel: string;
    oltType: string;
    isPizzaBox: (number | boolean)[];
    voalleAccessPointId: number[];
}