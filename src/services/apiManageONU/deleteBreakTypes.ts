import axios from "axios";
import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function deleteBreakTimeTypes({id, rule}: {id: number, rule: number}): Promise<IResponseData | IResponseError>{
    const res = await axios({
        method: 'delete',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/breakType`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        data:{
            id: id,
            department: rule
        }
    }).then((response) => {
        return response.data;
    }).catch(() => {
        return null;
    });

    return res;
}