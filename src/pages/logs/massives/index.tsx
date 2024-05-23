import { useEffect, useState } from "react";
import { FilterMassives } from "./filterOptions";
import { formatDateToISOFormat } from "../../../config/formatDate";

export function LogsMassives(){
    const [filterParams, setFilterParams] = useState<any>();

    useEffect(() => {

    }, [filterParams]);

    const handleFilterChange = (filter: any | null) => {
        
        console.log(formatDateToISOFormat(filter.initialDate, false))
        setFilterParams(filter);
    };

    return(
        <>
            <FilterMassives onFilterChange={handleFilterChange}/>
        </>
    )
}