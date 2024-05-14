import axios from "axios";
import { IResponseData, IResponseError } from "../../interfaces/IDefaultResponse";

export async function getUsers(): Promise<IResponseData | IResponseError>{
    const users = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_BASEURL_MANAGE_ONU}/users`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('Authorization')}`
        },
        data: {},
    }).then((response) => {
        return response.data;
    }).catch(() => {
        return null;
    });

    return users;
}