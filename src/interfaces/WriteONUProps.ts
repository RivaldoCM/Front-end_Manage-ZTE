import { Olt } from "./olt";

export interface WriteONUProps {
    city: string;
    dataFromApi: Array<{
        placa: number,
        pon: number,
        model: string,
        serial: string
    }>;
    setDataFromApi: (dataFromApi: any[]) => void;
    setSerialNumber: (serialNumber: string) => void;
    serialNumber: string;
    handleError: (error: string) => void;
    isLoading: boolean;
    startLoading: () => void;
    stopLoading: () => void;
    typeOnu: string;
    OltInfo: Olt[];
}