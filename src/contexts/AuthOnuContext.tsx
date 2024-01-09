
import { createContext, useState } from "react";

export const AuthOnuContext = createContext<any>(null);

export function AuthOnuContextProvider(props: any){
    const [onu, setOnu] = useState();
    return(
        <AuthOnuContext.Provider value={{ onu, setOnu }}> 
            {props.children}
        </AuthOnuContext.Provider>
    )
}