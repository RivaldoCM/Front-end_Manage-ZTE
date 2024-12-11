import axios from "axios";
import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function getBreakTimeTypes({rule}: {rule: number}): Promise<IResponseData | IResponseError>{
    const res = await axios({
        method: 'GET',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/breakType`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        params:{
            departmentId: rule
        }
    }).then((response) => {
        return response.data;
    }).catch(() =>{
        return null;
    });
    return res;
}