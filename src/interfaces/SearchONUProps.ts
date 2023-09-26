import { OltInfoItem } from "./OltInfoItem";

export interface SearchONUProps {
    setCity: (city: string) => void;
    city: string;
    setDataFromApi: (data: any[]) => void;
    serialNumber: string;
    handleError: (error: string) => void;
    isLoading: boolean;
    startLoading: () => void;
    stopLoading: () => void;
    OltInfo: OltInfoItem[];
    setSerialNumber: (serialNumber: string) => void;
}