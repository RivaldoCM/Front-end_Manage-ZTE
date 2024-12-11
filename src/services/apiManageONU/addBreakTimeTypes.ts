import axios from "axios";
import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function addBreakTimeTypes({name, duration, rule}: {name: string, duration: number, rule: number}): Promise<IResponseData | IResponseError>{
    const res = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/breakType`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        data:{
            name: name,
            duration: duration,
            rule: rule
        }
    }).then((response) => {
        return response.data;
    }).catch(() => {
        return null;
    });

    return res;
}