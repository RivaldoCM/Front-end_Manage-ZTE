import axios from "axios";

import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function getNetworkTopology({oltId}: {oltId: number | null}): Promise<IResponseData | IResponseError>{
    const response = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/networkTopology`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`,
        },
        params: {
            oltId: oltId
        }
    }).then((response) => {
        return response.data;
    }).catch((err) => {
        return err;
    });
    return response;
}