import { useEffect, useState } from "react";
import { FilterMassives } from "./filterOptions";
import { getMassiveLogs } from "../../../services/apiManageONU/getMassiveLogs";
import { useResponse } from "../../../hooks/useResponse";

export function LogsMassives(){
    const { setFetchResponseMessage } = useResponse();

    const [massives, setMassives] = useState([]);
    const [filterParams, setFilterParams] = useState<any>(undefined);

    useEffect(() => {
        const getData = async () => {
            const response = await getMassiveLogs({
                initialDate: filterParams.initialDate,
                lastDate: filterParams.lastDate,
                problemType: filterParams.problemType,
                cityId: filterParams.cityId,
                cpf: filterParams.cpf
            });
            
            if(response){
                if(response.success){
                    setMassives(response.responses.response);
                } else {
                    setFetchResponseMessage(response.messages.message);
                }
            } else {
                setFetchResponseMessage('error/no-connection-with-API');
            }
        }
        getData();
    }, [filterParams]);

    const handleFilterChange = (filter: any | null) => {
        setFilterParams(filter);
    };

    console.log(massives)

    return(
        <>
            <FilterMassives onFilterChange={handleFilterChange}/>
        </>
    )
}