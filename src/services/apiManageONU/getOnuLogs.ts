import axios from "axios";
import dayjs from "dayjs";

import { formatDateToISOFormat } from "../../config/formatDate";
import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function getOnuLogs(props: IFilterOnuLogs): Promise<IResponseData | IResponseError>{
    let urlParams = '';
    let formatedInitialDate;
    let formatedLastDate;

    console.log(props)

    if(!props){
        const startOfDay = formatDateToISOFormat(dayjs().format('DD-MM-YYYY'), false);
        const endOfDay = formatDateToISOFormat(dayjs().format('DD-MM-YYYY'), true);

        urlParams = `getLogsOnu/${startOfDay}/${endOfDay}/null/null/null/null`
    } else {
        const { initialDate, lastDate, userId, cityId, oltId, state } = props;
        if(initialDate){
            formatedInitialDate = formatDateToISOFormat(initialDate, false);
        }

        if(lastDate){
            formatedLastDate = formatDateToISOFormat(lastDate, true);
        }

        urlParams = `getLogsOnu/${formatedInitialDate || 'null'}/${formatedLastDate || 'null'}/${userId || 'null'}/${cityId || 'null'}/${oltId || 'null'}/${state || 'null'}`
    }

    const onudata = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/${urlParams}`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
        }
    }).then((response) => {
        return response.data;
    }).catch(() => {
        return null;
    });
    
    return onudata;
}