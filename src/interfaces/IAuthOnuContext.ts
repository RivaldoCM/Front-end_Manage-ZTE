type IAuthOnuContext = {
    ip: string[];
    userId: number;
    oltId: number[];
    cityId: number;
    city: string;
    cpf: string,
    pppoeUser: string;
    pppoePassword: string,
    wifiName: string,
    wifiPassword: string,
    onuType: string;
    oltType: string;
    isPizzaBox: boolean[];
    voalleAccessPointId: number[];
}