import axios from "axios";

import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function getOlt(type: string): Promise<IResponseData | IResponseError>{
    const oltData = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/olt/${type}`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
        },
    }).then((response) => {
        return response.data;
    }).catch((err) => {
        return undefined;
    });

    return oltData;
}