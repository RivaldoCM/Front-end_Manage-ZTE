import axios from "axios";

import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function getOnuLogs(): Promise<IResponseData | IResponseError>{
    const onudata = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/getLogsOnu`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
        },
    }).then((response) => {
        console.log(response)
        return response.data;
    }).catch(() => {
        return undefined;
    });
    
    return onudata;
}