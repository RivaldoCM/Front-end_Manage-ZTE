import { Controller } from "./style";
import { SearchONU } from "./SearchONU";
import { WriteONU } from "./WriteONU";
import { useResponse } from "../../hooks/useResponse";
import { Alert } from "@mui/material";

export function AuthOnuController(){
    const {response, severityStatus, responseMassage} = useResponse();
    return(
        <Controller className="flex">
            <SearchONU />
            <WriteONU />
            {
                response ? 
                <Alert severity={severityStatus} className="alert">{responseMassage}</Alert>
                : <></>
            }
        </Controller>
    );
}