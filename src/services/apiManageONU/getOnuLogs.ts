import axios from "axios";

import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function getOnuLogs(props: IFilterOnuLogs): Promise<IResponseData | IResponseError>{

    let urlParams = ''
    if(!props){
        urlParams = `getLogsOnu/`
    } else {
        const { initialDate, lastDate, userId, cityId, oltId, state } = props;
        urlParams = `getLogsOnu/${initialDate || 'null'}/${lastDate || 'null'}/${userId || 'null'}/${cityId || 'null'}/${oltId || 'null'}/${state || 'null'}`
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