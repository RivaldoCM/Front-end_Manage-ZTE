import { OltInfoItem } from "./OltInfoItem";

export interface WriteONUProps {
    city: string;
    dataFromApi: Array<{
        placa: string,
        pon: string,
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
    OltInfo: OltInfoItem[];
}