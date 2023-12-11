import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";
import { handleShowPageByRule } from "../config/menu";
import { IAuthContextProps, IAuthContextProviderProps } from "../interfaces/IAuthContextProps";
import { IDecodedJTW } from "../interfaces/IDecodedJWT";

export const AuthContext = createContext<IAuthContextProps | undefined>(undefined);

export function AuthContextProvider(props: IAuthContextProviderProps){
    const [user, setUser] = useState<{ rule: number; uid: number } | undefined>(() => {
        const storedToken = localStorage.getItem('Authorization');
        if (storedToken) {

            try{
                const decodedToken: IDecodedJTW = jwtDecode(storedToken);
                return decodedToken;
            } catch(err){
                return;
            }
        }
    });
    handleShowPageByRule(user?.rule);
    return(
        <AuthContext.Provider value={{ user, setUser }}> 
            {props.children}
        </AuthContext.Provider>
    )
}