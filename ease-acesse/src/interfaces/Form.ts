export interface FormProps {
    handleSubmitWriteData: React.FormEventHandler<HTMLFormElement>;
    handlePppoeChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    handleContractNumberChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    isLoading: boolean;
    item: string;
    serialNumber: string, 
    setDataOnu: Array<{
        placa: string,
        pon: string,
        model: string,
        serial: string
    }>;
    handlePppoePassChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    handleWifiSSIDChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    handleWifiPassChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}