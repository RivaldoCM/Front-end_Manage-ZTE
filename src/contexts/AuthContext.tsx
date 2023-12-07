import { jwtDecode } from "jwt-decode";
import { createContext, useState } from "react";
import { handleDynamicPagesByRule, handleShowPageByRule } from "../config/menu";

export const AuthContext = createContext('');

export function AuthContextProvider(props: any){
    const [user, setUser] = useState<string | undefined>(() => {
        const storedToken = localStorage.getItem('Authorization');
        if (storedToken) {
            const decodedToken = jwtDecode(storedToken)
            handleShowPageByRule(decodedToken.rule)
            return decodedToken;
        }
        return undefined;
    });

    return(
        <AuthContext.Provider value={{ user, setUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}