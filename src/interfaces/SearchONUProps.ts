import { Olt } from "./olt";

export interface SearchONUProps {
    type: string,
    setCity: (city: string) => void;
    city: string;
    setDataFromApi: (data: any[]) => void;
    serialNumber: string;
    handleError: (error: string) => void;
    isLoading: boolean;
    startLoading: () => void;
    stopLoading: () => void;
    OltInfo: Olt[];
    setSerialNumber: (serialNumber: string) => void;
}