type IAuthOnuContext = {
    oltId: number | string;
    cpf: string,
    pppoeUser: string;
    pppoePassword: string;
    isActiveBS: boolean;
    wifiNameBS: string;
    wifiPasswordBS: string;
    wifiName24: string;
    wifiPassword24: string;
    wifiName58: string;
    wifiPassword58: string;
    typeOnu: string;
    modelOnu: string;
    modelOlt: string[];
    voalleAccessPointId: string | number;
    sipUser?: string;
    sipPass?: string;
}