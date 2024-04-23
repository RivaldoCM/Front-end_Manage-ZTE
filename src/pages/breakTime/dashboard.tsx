import { useEffect, useState } from "react";
import { getBreakTimeTypes } from "../../services/apiManageONU/getBreakTimeTypes";
import { getBreakTime } from "../../services/apiManageONU/getBreakTime";

export function BreakPointDashBoard(){
    const [breakTimes, setBreakTimes] = useState<IBreaktimeTypes[]>([]);
    const [types, setTypes] = useState<IBreaktimeTypes[]>([]);

    useEffect(() => {
        const getData = async () => {
            const getTimes = getBreakTime(true);
            const getTypes = getBreakTimeTypes();
            const [ times, types ] = await Promise.all([getTimes, getTypes]);

            times.success ? setBreakTimes(times.responses.response) : setBreakTimes([]);
            types.success ? setTypes(types.responses.response) : setTypes([]);
        }
        getData();
    }, []);
    
    return(
        <>oi</>
    )
}