
import { ReactNode, createContext, useState, Dispatch, SetStateAction } from "react";
import { IOlt } from "../interfaces/IOlt";
import { IOnus } from "../interfaces/IOnus";

export const AuthOnuContext = createContext<{
    authOnu: IAuthOnuContext;
    setAuthOnu: Dispatch<SetStateAction<IAuthOnuContext>>;
    viewOnlyOlt: IOlt[] | undefined;
    setViewOnlyOlt: Dispatch<SetStateAction<IOlt[] | undefined>>;
    onus: IOnus[] | undefined,
    setOnus: Dispatch<SetStateAction<IOnus[] | undefined>>
} | undefined>(undefined);

export function AuthOnuContextProvider({ children }: { children: ReactNode }){
    const [authOnu, setAuthOnu] = useState<IAuthOnuContext>({
        ip: [],
        oltId: [],
        cityId: 0,
        city: '',
        cpf: '',
        pppoeUser: '',
        pppoePassword: '',
        wifiName: '',
        wifiPassword: '',
        onuType: '',
        onuModel: '',
        oltType: 'zte',
        isPizzaBox: [],
        voalleAccessPointId: []
    });
    const [viewOnlyOlt, setViewOnlyOlt] = useState<IOlt[] | undefined>(undefined);
    const [onus, setOnus] = useState<IOnus[] | undefined>(undefined);

    return(
        <AuthOnuContext.Provider value={{ authOnu, setAuthOnu, viewOnlyOlt, setViewOnlyOlt, onus, setOnus }}> 
            {children}
        </AuthOnuContext.Provider>
    )
}