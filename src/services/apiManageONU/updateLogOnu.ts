import axios from "axios";

import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function updateLogsOnu({id, isUpdated}: {id: number, isUpdated: boolean}): Promise<IResponseData | IResponseError>{
    const onuData = await axios({
        method: 'patch',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/logsOnu`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
        },
        data:{
            id: id,
            isUpdated: isUpdated
        }
    }).then((response) => {
        return response.data;
    }).catch(() => {
        return null;
    });
    
    return onuData;
}