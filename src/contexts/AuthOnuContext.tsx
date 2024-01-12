
import { createContext, useState } from "react";

export const AuthOnuContext = createContext<any>(null);
export function AuthOnuContextProvider(props: any){
    const [authOnu, setAuthOnu] = useState({
        ip: '',
        userId: 0,
        oltId: 0,
        cityId: 0,
        city: '',
        serial: '',
        slot: 0,
        pon: 0,
        pppoe: '',
        onuType: 'zte',
        oltType: ''
    });
    const [viewOnlyOlt, setViewOnlyOlt] = useState<any>([]);

    return(
        <AuthOnuContext.Provider value={{ authOnu, setAuthOnu, viewOnlyOlt, setViewOnlyOlt }}> 
            {props.children}
        </AuthOnuContext.Provider>
    )
}