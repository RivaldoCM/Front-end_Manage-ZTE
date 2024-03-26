
import { ReactNode, createContext, useState, Dispatch, SetStateAction, useEffect } from "react";
import { handleMessage } from "../config/handleMessage";
import { AlertColor } from "@mui/material";

export const ResponseContext = createContext<{
    response: boolean;
    setResponse: Dispatch<SetStateAction<boolean>>,
    responseMassage: string;
    setResponseMassage: Dispatch<SetStateAction<string>>;
    severityStatus: AlertColor | undefined;
    setSeverityStatus: Dispatch<SetStateAction<AlertColor | undefined>>;
    fetchResponseMessage: string | null; 
    setFetchResponseMessage: Dispatch<SetStateAction<string | null>>;
} | undefined>(undefined);

export function HandleResponseContextProvider({ children }: { children: ReactNode }){
    const [response, setResponse] = useState(false);
    const [responseMassage, setResponseMassage] = useState('');
    const [severityStatus, setSeverityStatus] = useState<AlertColor | undefined>();
    const [fetchResponseMessage, setFetchResponseMessage] = useState<string | null>(null);
    
    useEffect(() => {
        if(fetchResponseMessage){
            const res = handleMessage(fetchResponseMessage);
            setResponseMassage(res.responseMessage);
            setSeverityStatus(res.severityStatus);
            setResponse(true);
        }
    }, [fetchResponseMessage]);

    useEffect(() => {
        if(response){
            setTimeout(() => {
                setResponse(false);
                setFetchResponseMessage(null);
            }, 8000);
        }
    }, [response]);

    return(
        <ResponseContext.Provider value={{ 
            response, 
            setResponse, 
            responseMassage, 
            setResponseMassage, 
            severityStatus, 
            setSeverityStatus, 
            fetchResponseMessage, 
            setFetchResponseMessage 
        }}> 
            {children}
        </ResponseContext.Provider>
    )
}