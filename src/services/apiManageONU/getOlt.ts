import axios from "axios";

import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function getOlt({id, host}: {id?: number, host?: string}): Promise<IResponseData | IResponseError>{
    const response = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/olt`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
        },
        params:{
            oltId: id || null,
            host: host || null
        }
    }).then((response) => {
        return response.data;
    }).catch(() => {
        return null;
    });
    
    return response;
}