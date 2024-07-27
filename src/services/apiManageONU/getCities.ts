import axios from "axios";
import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function getCities(): Promise<IResponseData | IResponseError | null>{
    const response = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/cities`,
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