import { Olt } from "./olt";

export interface propsApi{
    city: string;
    matchSerialNumber: string;
    setDataFromApi: (data: any[]) => void;
    serialNumber: string;
    handleError: (error: string) => void;
    startLoading: () => void;
    stopLoading: () => void;
    typeOnu: string;
    OltInfo: Array<Array<Olt>> | Array<any>;
}