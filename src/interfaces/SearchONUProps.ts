import { Olt } from "./olt";

export interface SearchONUProps {
    setCity: (city: string) => void;
    city: string;
    setDataFromApi: (data: any[]) => void;
    serialNumber: string;
    handleError: (error: string) => void;
    isLoading: boolean;
    startLoading: () => void;
    stopLoading: () => void;
    OltInfo: Array<Array<Olt>>;
    typeOnu: string;
    setSerialNumber: (serialNumber: string) => void;
}