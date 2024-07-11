
import { ReactNode, createContext, useState, Dispatch, SetStateAction } from "react";
import { IOnus } from "../interfaces/IOnus";

export const AuthOnuContext = createContext<{
    authOnu: IAuthOnuContext;
    setAuthOnu: Dispatch<SetStateAction<IAuthOnuContext>>;
    onus: IOnus[] | undefined,
    setOnus: Dispatch<SetStateAction<IOnus[] | undefined>>
} | undefined>(undefined);

export function AuthOnuContextProvider({ children }: { children: ReactNode }){
    const [authOnu, setAuthOnu] = useState<IAuthOnuContext>({
        oltId: '' as number | '',
        cpf: '',
        pppoeUser: '',
        pppoePassword: '',
        wifiName: '',
        wifiPassword: '',
        typeOnu: '',
        modelOnu: 'F601',
        modelOlt: [],
        voalleAccessPointId: '' as number | ''
    });
    const [onus, setOnus] = useState<IOnus[] | undefined>(undefined);

    return(
        <AuthOnuContext.Provider value={{ authOnu, setAuthOnu, onus, setOnus }}> 
            {children}
        </AuthOnuContext.Provider>
    )
}