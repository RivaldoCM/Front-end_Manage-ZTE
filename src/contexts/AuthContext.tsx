import { createContext, useState } from "react";

export const AuthContext = createContext('');

export function AuthContextProvider(props: any){
    const [user, setUser] = useState<string | undefined>();

    return(
        <AuthContext.Provider value={{ user, setUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}