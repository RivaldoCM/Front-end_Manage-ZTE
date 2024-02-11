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
    typeOnu: string;
    modelOnu: string;
    modelOlt: number[];
    isPizzaBox: (number | boolean)[];
    voalleAccessPointId: number[];
}