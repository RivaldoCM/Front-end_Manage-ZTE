
import { ReactNode, createContext, useState, Dispatch, SetStateAction } from "react";
import { Olt } from "../interfaces/olt";

export const AuthOnuContext = createContext<{
    authOnu: IAuthOnuContext;
    setAuthOnu: Dispatch<SetStateAction<IAuthOnuContext>>;
    viewOnlyOlt: Olt[] | undefined;
    setViewOnlyOlt: Dispatch<SetStateAction<Olt[] | undefined>>;
} | undefined>(undefined);

export function AuthOnuContextProvider({ children }: { children: ReactNode }){
    const [authOnu, setAuthOnu] = useState<IAuthOnuContext>({
        ip: [],
        userId: 0,
        oltId: [],
        cityId: 0,
        city: '',
        serial: '',
        slot: 0,
        pon: 0,
        pppoe: '',
        onuType: '',
        oltType: 'zte',
        voalleAccessPointId: []
    });
    const [viewOnlyOlt, setViewOnlyOlt] = useState<Olt[] | undefined>(undefined);
    const [onus, setOnus] = useState(undefined);

    return(
        <AuthOnuContext.Provider value={{ authOnu, setAuthOnu, viewOnlyOlt, setViewOnlyOlt }}> 
            {children}
        </AuthOnuContext.Provider>
    )
}