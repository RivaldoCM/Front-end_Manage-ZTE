import { useEffect, useState } from "react";
import { getOnuLogs } from "../../services/apiManageONU/getOnuLogs";
import dayjs from "dayjs";

export function MyAuthorizedOnusMobile(){
    const [onu, setOnu] = useState<IOnuLogs[]>([]);
    useEffect(() => {
        async function getData(){
            const response = await getOnuLogs({initialDate: dayjs().subtract(7, 'day').format('DD-MM-YYYY'), lastDate: dayjs().format('DD-MM-YYYY'), userId: 150439});

            if(response){
                if(response.success){
                    setOnu(response.responses.response);
                } else {
                    setOnu([]);
                }
            } else {
                setOnu([]);
            }
        };
        getData();
    }, []);

    return (
        <></>
    )
}