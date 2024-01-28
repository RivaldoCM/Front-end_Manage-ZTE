import axios from "axios";

import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";
import dayjs from "dayjs";

function formatDataToEnFormat(date: string, last: boolean){
    const splitedDate = date.split('-');
    const formated = `${splitedDate[1]}-${splitedDate[0]}-${splitedDate[2]}`

    if(last){
        const teste = dayjs(formated).set('hour', 23).set('minute', 59).set('second', 59).set('millisecond', 999).endOf('day');
        const offUTC = dayjs(teste).utcOffset(); // formato -3, subtrai da data atual depois 
        return dayjs(offUTC).toISOString();
    }


    const toISOFormat = dayjs(formated).toISOString();

    return toISOFormat;
}

export async function getOnuLogs(props: IFilterOnuLogs): Promise<IResponseData | IResponseError>{

    let urlParams = '';
    let formatedInitialDate;
    let formatedLastDate;

    if(!props){
        urlParams = `getLogsOnu/`
    } else {
        const { initialDate, lastDate, userId, cityId, oltId, state } = props;
        if(initialDate){
            formatedInitialDate = formatDataToEnFormat(initialDate, false);
        }

        if(lastDate){
            formatedLastDate = formatDataToEnFormat(lastDate, true);
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
        return undefined;
    });
    
    return onudata;
}