type IAuthOnuContext = {
    oltId: number | string;
    cpf: string,
    pppoeUser: string;
    pppoePassword: string,
    wifiName: string,
    wifiPassword: string,
    typeOnu: string;
    modelOnu: string;
    modelOlt: string[];
    voalleAccessPointId: number[];
}