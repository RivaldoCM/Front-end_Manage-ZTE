import { useContext } from "react";
import { BreakTimeContext } from "../contexts/BreakTimeContext";

export function useBreakTime(){
    const context = useContext(BreakTimeContext);

    if(!context){
        throw new Error("useBreakTime must be used within an BreakTimeContextProvider");
    }
    return context;
}