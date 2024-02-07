
import { ReactNode, createContext, useState, Dispatch, SetStateAction, useEffect } from "react";
import { handleMessage } from "../config/handleResponse";

export const ResponseContext = createContext<{
    response: boolean;
    setResponse: any,
    responseMassage: string;
    setResponseMassage: any;
    severityStatus: any;
    setSeverityStatus: any;
    fetchResponseMessage: string | null; 
    setFetchResponseMessage: any;
} | undefined>(undefined);

export function HandleResponseContextProvider({ children }: { children: ReactNode }){
    const [response, setResponse] = useState(false);
    const [responseMassage, setResponseMassage] = useState('');
    const [severityStatus, setSeverityStatus] = useState<any>();
    const [fetchResponseMessage, setFetchResponseMessage] = useState<string | null>(null);

    useEffect(() => {
        if(fetchResponseMessage){
            const res = handleMessage(fetchResponseMessage);
            setResponse(true);
            setResponseMassage(res.responseMessage);
            setSeverityStatus(res.severityStatus);
        }
    }, [fetchResponseMessage]);

    useEffect(() => {
        if(response){
            setTimeout(() => {
                setResponse(false);
            }, 10000);
        }
    }, [response]);

    return(
        <ResponseContext.Provider value={{ response, setResponse, responseMassage, setResponseMassage, severityStatus, setSeverityStatus, fetchResponseMessage, setFetchResponseMessage }}> 
            {children}
        </ResponseContext.Provider>
    )
}