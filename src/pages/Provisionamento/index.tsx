import { Controller } from "./style";
import { SearchONU } from "./SearchONU";
import { WriteONU } from "./WriteONU";

export function AuthOnuController(){
    return(
        <Controller className="flex">
            <SearchONU />
            <WriteONU />
        </Controller>
    );
}