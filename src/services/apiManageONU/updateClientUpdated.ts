import axios from "axios";
import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function updateClientUpdated({ id, userId, isUpdated }: {id: number, userId: number, isUpdated: boolean}): Promise<IResponseData | IResponseError>{
    const res = await axios({
        method: 'patch',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/clientUpdate`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        data:{
            id: id,
            user: userId,
            isUpdated: isUpdated
        }
    }).then((response) => {
        return response.data;
    }).catch(() => {
        return null;
    });

    return res;
}