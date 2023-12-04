import { OltInfoItem } from "./OltInfoItem";

export interface propsApi{
    city: string;
    matchSerialNumber: string;
    setDataFromApi: (data: any[]) => void;
    serialNumber: string;
    handleError: (error: string) => void;
    startLoading: () => void;
    stopLoading: () => void;
    OltInfo: OltInfoItem[];
}