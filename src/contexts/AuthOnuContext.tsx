
import { ReactNode, createContext, useState, Dispatch, SetStateAction } from "react";
import { IOlt } from "../interfaces/IOlt";

export const AuthOnuContext = createContext<{
    authOnu: IAuthOnuContext;
    setAuthOnu: Dispatch<SetStateAction<IAuthOnuContext>>;
    viewOnlyOlt: IOlt[] | undefined;
    setViewOnlyOlt: Dispatch<SetStateAction<IOlt[] | undefined>>;
    onus: any[] | undefined,
    setOnus: Dispatch<SetStateAction<any[] | undefined>>
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
        cpf: '',
        pppoeUser: '',
        pppoePassword: '',
        wifiName: '',
        wifiPassword: '',
        onuType: '',
        oltType: 'zte',
        voalleAccessPointId: []
    });
    const [viewOnlyOlt, setViewOnlyOlt] = useState<IOlt[] | undefined>(undefined);
    const [onus, setOnus] = useState<any[] | undefined>(undefined);

    return(
        <AuthOnuContext.Provider value={{ authOnu, setAuthOnu, viewOnlyOlt, setViewOnlyOlt, onus, setOnus }}> 
            {children}
        </AuthOnuContext.Provider>
    )
}