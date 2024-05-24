import { useEffect, useState } from "react";
import { FilterMassives } from "./filterOptions";
import { getMassiveLogs } from "../../../services/apiManageONU/getMassiveLogs";

export function LogsMassives(){
    const [massives, setMassives] = useState([])
    const [filterParams, setFilterParams] = useState<any>();

    useEffect(() => {
        const getData = async () => {
            const response = await getMassiveLogs({
                initialDate: filterParams.initialDate,
                lastDate: filterParams.lastDate,
                problemType: filterParams.problemType,
                cityId: filterParams.cityId
            });
            if(response){
                if(response.success){
                    setMassives(response.responses.response);
                } else {

                }
            } else {

            }
        }
        getData();
    }, [filterParams]);

    const handleFilterChange = (filter: any | null) => {
        console.log(filter)
        setFilterParams(filter);
    };

    return(
        <>
            <FilterMassives onFilterChange={handleFilterChange}/>
        </>
    )
}