export interface FormProps {
    handleSubmitWriteData: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    handlePppoeChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    handleCpfChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    isLoading: boolean;
    item?: {
        placa: number;
        pon: number;
        model: string;
        serial: string;
    }| string;
    typeOnu?: string,
    serialNumber: string, 
    setDataOnu: React.Dispatch<React.SetStateAction<{ placa: number; pon: number; model: string; serial: string; }[]>>;
    handlePppoePassChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    handleWifiSSIDChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    handleWifiPassChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}