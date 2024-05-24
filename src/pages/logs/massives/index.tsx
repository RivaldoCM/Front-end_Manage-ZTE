import { useEffect, useState } from "react";
import { FilterMassives } from "./filterOptions";

export function LogsMassives(){
    const [filterParams, setFilterParams] = useState<any>();

    useEffect(() => {

    }, [filterParams]);

    const handleFilterChange = (filter: any | null) => {
        setFilterParams(filter);
    };

    return(
        <>
            <FilterMassives onFilterChange={handleFilterChange}/>
        </>
    )
}