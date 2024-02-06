import axios from "axios";
import dayjs from "dayjs";

import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export function formatDataToEnFormat(date: string, last: boolean){
    const splitedDate = date.split('-');
    const formated = `${splitedDate[1]}-${splitedDate[0]}-${splitedDate[2]}`

    if(last){
        //O 'Z' ESTA PARA INDICAR QUUE É FORMATO UTC E O RESTANTE COMBINADO PARA ISO 8601,
        //ASSIM A DATA É UTC MAS SEM SOMAR -03:00 DO NOSSO HORARIO LOCAL
        const dateISO = dayjs(formated).endOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
        return dateISO;
    }

    const toISOFormat = dayjs(formated).startOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
    return toISOFormat;
}

export async function getOnuLogs(props: IFilterOnuLogs): Promise<IResponseData | IResponseError>{
    let urlParams = '';
    let formatedInitialDate;
    let formatedLastDate;

    if(!props){
        const startOfDay = formatDataToEnFormat(dayjs().format('DD-MM-YYYY'), false);
        const endOfDay = formatDataToEnFormat(dayjs().format('DD-MM-YYYY'), true);

        urlParams = `getLogsOnu/${startOfDay}/${endOfDay}/null/null/null/null`
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
        return null;
    });
    
    return onudata;
}