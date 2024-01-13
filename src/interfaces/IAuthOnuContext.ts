type IAuthOnuContext = {
    ip: string[];
    userId: number;
    oltId: number[];
    cityId: number;
    city: string;
    serial: string;
    slot: number;
    pon: number;
    pppoe: string;
    onuType: string;
    oltType: string;
    voalleAccessPointId: number[];
}