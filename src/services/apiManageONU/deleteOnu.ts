import axios from "axios";

import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function deleteOnu({userId, cityId, serialNumber}: {userId: number, cityId: number, serialNumber: string}): Promise<IResponseData | IResponseError>{
    const data = await axios({
        method: 'delete',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/deleteOnu`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        data: {
            userId: userId,
            cityId: cityId,
            serialNumber: serialNumber
        },
    }).then((res) => {
        return res.data;
    }).catch(() => {
        return false;
    });
    return data;
}