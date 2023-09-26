import { createContext, useState, ReactNode } from "react";

export const ApiContext = createContext(undefined);

interface ApiContextProviderProps {
    children: ReactNode;
}

export function ApiContextProvider({ children }: ApiContextProviderProps) {

    return (
        <ApiContext.Provider value={}>
            {children}
        </ApiContext.Provider>
    );
}
