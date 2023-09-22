import { useContext } from "react";
import { ApiContext } from "../contexts/APIContext";

export function useApiContext(){

    return useContext(ApiContext); 
}