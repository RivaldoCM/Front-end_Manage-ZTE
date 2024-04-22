import axios from "axios";
import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function getBreakTimeTypes(): Promise<IResponseData | IResponseError>{
    const res = await axios({
        method: 'GET',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/breakTimeTypes`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
    }).then((response) => {
        return response.data;
    }).catch(() =>{
        return null;
    });
    return res;
}
