import axios from "axios";

import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function getOltModel(): Promise<IResponseData | IResponseError>{
    const response = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/oltModel`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
        },
    }).then((response) => {
        return response.data;
    }).catch(() => {
        return null;
    });
    
    return response;
}