import { useContext } from "react";
import { AuthOnuContext } from "../contexts/AuthOnuContext";

export function useAuthOnu() {
    const context = useContext(AuthOnuContext);

    if(!context){
        throw new Error("useAuthOnu must be used within an AuthOnuContextProvider");
    }
    return context;
}
