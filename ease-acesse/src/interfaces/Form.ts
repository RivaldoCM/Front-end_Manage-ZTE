export interface FormProps {
    handleSubmitWriteData: React.FormEvent<HTMLFormElement>,
    handlePppoeChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>, 
    handleContractNumberChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>, 
    isLoading: boolean, 
    item: string, 
    serialNumber: string, 
    setDataOnu: any[],
    handlePppoePassChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
    handleWifiSSIDChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
    handleWifiPassChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    
}